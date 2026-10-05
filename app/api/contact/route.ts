// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── レート制限（同一IPあたり10分で3件まで）─────────────────
// ※ Vercel等のサーバーレス環境ではインスタンス間で共有されないため、
//    本番運用では Upstash Redis 等の外部ストアへの置き換えを推奨
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  // メモリリーク防止: 古いIPを定期的に掃除
  if (requestLog.size > 1000) {
    requestLog.forEach((value, key) => {
      if (value.every((t: number) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        requestLog.delete(key);
      }
    });
  }
  return false;
}

// ── バリデーション ─────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = {
  name: string;
  email: string;
  address: string;
  product: string;
  quantity: number;
  message: string;
};

function validate(
  data: unknown
): { ok: true; fields: Fields } | { ok: false; error: string } {
  if (typeof data !== "object" || data === null) {
    return { ok: false, error: "不正なリクエストです" };
  }
  const d = data as Record<string, unknown>;

  // ハニーポット: ボットが埋める隠しフィールド。値があれば拒否
  if (typeof d.company === "string" && d.company.length > 0) {
    return { ok: false, error: "送信できませんでした" };
  }

  const str = (v: unknown, max: number): string | null =>
    typeof v === "string" && v.trim().length > 0 && v.length <= max
      ? v.trim()
      : null;

  const name = str(d.name, 100);
  const email = str(d.email, 254);
  const address = str(d.address, 300);
  const product = str(d.product, 200);
  const message =
    typeof d.message === "string" ? d.message.slice(0, 2000) : "";

  if (!name || !address || !product) {
    return { ok: false, error: "必須項目が不足しています" };
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "メールアドレスの形式が正しくありません" };
  }

  const quantity = Number(d.quantity);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
    return { ok: false, error: "数量が正しくありません" };
  }

  // メールヘッダインジェクション対策: 件名等に使う値から改行を除去
  const clean = (s: string) => s.replace(/[\r\n]+/g, " ");

  return {
    ok: true,
    fields: {
      name: clean(name),
      email: clean(email),
      address,
      product: clean(product),
      quantity,
      message,
    },
  };
}

// ── メイン ─────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Origin チェック（CSRF緩和）
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin && host && new URL(origin).host !== host) {
      return NextResponse.json(
        { success: false, error: "不正なリクエストです" },
        { status: 403 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "送信回数の上限に達しました。しばらく待ってから再度お試しください。",
        },
        { status: 429 }
      );
    }

    const data = await req.json();
    const result = validate(data);
    if (!result.ok) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    const { name, email, address, product, quantity, message } = result.fields;

    // Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.jp",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_APP_PASSWORD,
      },
    });

    const ownerMail = {
      from: "mottECogoods <info@mottecogoods.com>",
      to: "info@mottecogoods.com",
      replyTo: email,
      subject: `【ご注文】${product} × ${quantity}`,
      text: `
ご注文が入りました。

━━━━━━━━━━━━━━━━━━
商品　　：${product}
数量　　：${quantity}
お名前　：${name}
メール　：${email}
ご住所　：${address}
備考　　：${message || "（なし）"}
━━━━━━━━━━━━━━━━━━

このメールに返信すると、お客様（${email}）に直接返信できます。
      `,
    };

    const customerMail = {
      from: "mottECogoods <info@mottecogoods.com>",
      to: email,
      subject: `【mottECOグッズ.com】ご注文ありがとうございます`,
      text: `${name} 様

この度はmottECOグッズ.comをご利用いただき、
誠にありがとうございます。

以下の内容でご注文を承りました。
在庫を確認のうえ、改めてご連絡いたします。

━━━━━━━━━━━━━━━━━━
商品　　：${product}
数量　　：${quantity}
お名前　：${name}
ご住所　：${address}
備考　　：${message || "（なし）"}
━━━━━━━━━━━━━━━━━━

ご不明な点がございましたら、
本メールにご返信ください。

mottECOグッズ.com（運営：the合同会社）
info@mottecogoods.com
      `,
    };

    await transporter.sendMail(ownerMail);
    await transporter.sendMail(customerMail);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Mail error:", error);
    return NextResponse.json(
      { success: false, error: "メール送信に失敗しました" },
      { status: 500 }
    );
  }
}
