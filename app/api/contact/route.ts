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

// 日本の電話番号: 0から始まる10〜11桁（ハイフンを除去して判定）
const PHONE_RE = /^0\d{9,10}$/;

// 日本語（ひらがな・カタカナ・漢字・長音符・繰り返し記号・スペース）のみ
const JAPANESE_NAME_RE = /^[ぁ-んァ-ヶー一-龠々\s　]+$/;

type Fields = {
  companyName: string;
  name: string;
  email: string;
  phone: string;
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

  const companyName = str(d.companyName, 200);
  const name = str(d.name, 100);
  const email = str(d.email, 254);
  const phone = str(d.phone, 20);
  const address = str(d.address, 300);
  const product = str(d.product, 200);
  const message =
    typeof d.message === "string" ? d.message.slice(0, 2000) : "";

  if (!companyName || !name || !phone || !address || !product) {
    return { ok: false, error: "必須項目が不足しています" };
  }

  // ★ 担当者名が日本語かチェック（英数字・記号を弾く）
  if (!JAPANESE_NAME_RE.test(name)) {
    return {
      ok: false,
      error: "担当者名は日本語（ひらがな・カタカナ・漢字）でご入力ください",
    };
  }

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "メールアドレスの形式が正しくありません" };
  }

  // ★ 電話番号の形式チェック（ハイフンあり／なし両対応）
  if (!PHONE_RE.test(phone.replace(/-/g, ""))) {
    return { ok: false, error: "電話番号の形式が正しくありません" };
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
      companyName: clean(companyName),
      name: clean(name),
      email: clean(email),
      phone: clean(phone),
      address,
      product: clean(product),
      quantity,
      message,
    },
  };
}

// ── お客様向けメールの「型」（HTMLテンプレート）─────────
// 2026-11-25: 自動返信（お客様向け）は、枠・色の「型」を被せたHTMLで送る。
// 運営者宛の注文通知は従来どおりテキストのみ。
// 帯カラーはサイトの濃紺 #0a1428。フッターは
// サイト名／運営会社／住所／メールアドレス／サイトURL の5要素。
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function customerMailHtml(f: Fields): string {
  const rows: Array<[string, string]> = [
    ["商品", f.product],
    ["数量", String(f.quantity)],
    ["会社名", f.companyName],
    ["担当者名", f.name],
    ["電話", f.phone],
    ["ご住所", f.address],
    ["備考", f.message || "（なし）"],
  ];
  const rowsHtml = rows
    .map(([k, v], i) => {
      const border =
        i < rows.length - 1 ? "border-bottom:1px solid #edf0f5;" : "";
      return `
        <tr>
          <td style="padding:9px 4px;${border}color:#7a8699;font-weight:700;white-space:nowrap;width:92px;vertical-align:top;">${k}</td>
          <td style="padding:9px 4px;${border}vertical-align:top;">${escapeHtml(v).replace(/\n/g, "<br />")}</td>
        </tr>`;
    })
    .join("");
  return `
<div style="background:#eceff3;padding:24px 16px;font-family:-apple-system,'Hiragino Kaku Gothic ProN','Hiragino Sans',sans-serif;">
  <div style="width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
    <div style="background:#0a1428;padding:22px 28px;">
      <span style="color:#ffffff;font-size:21px;font-weight:900;letter-spacing:0.02em;">mott<span style="color:#ff8a50;">ECO</span>グッズ.com</span>
      <div style="color:#c3ccd9;font-size:12px;margin-top:5px;letter-spacing:0.06em;">食品ロス削減「mottECO」オリジナルグッズ</div>
    </div>
    <div style="padding:26px 28px 6px;color:#2a3442;font-size:14px;line-height:2.0;">
      <p style="margin:0 0 10px;font-weight:700;color:#14213d;">${escapeHtml(f.name)} 様</p>
      <p style="margin:0;">この度はmottECOグッズ.comをご利用いただき、誠にありがとうございます。<br />以下の内容でご注文を承りました。在庫を確認のうえ、改めてご連絡いたします。</p>
      <div style="border:1.5px solid #d8dfe9;border-radius:12px;padding:6px 18px;margin:18px 0 20px;">
        <table style="width:100%;border-collapse:collapse;font-size:13.5px;line-height:1.7;">${rowsHtml}
        </table>
      </div>
      <p style="margin:0;">ご不明な点がございましたら、本メールにご返信ください。</p>
    </div>
    <div style="border-top:1px solid #e3e8f0;padding:16px 28px 20px;font-size:11.5px;color:#66707e;line-height:1.9;background:#f8fafc;">
      mottECOグッズ.com<br />
      運営会社：the合同会社<br />
      〒357-0123 埼玉県飯能市中藤下郷23-21<br />
      <a href="mailto:info@mottecogoods.com" style="color:#66707e;">info@mottecogoods.com</a><br />
      <a href="https://mottecogoods.com" style="color:#66707e;">https://mottecogoods.com</a>
    </div>
  </div>
</div>`;
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
    const { companyName, name, email, phone, address, product, quantity, message } =
      result.fields;

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
会社名　：${companyName}
担当者名：${name}
メール　：${email}
電話　　：${phone}
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
会社名　：${companyName}
担当者名：${name}
電話　　：${phone}
ご住所　：${address}
備考　　：${message || "（なし）"}
━━━━━━━━━━━━━━━━━━

ご不明な点がございましたら、
本メールにご返信ください。

mottECOグッズ.com（運営：the合同会社）
info@mottecogoods.com
      `,
      html: customerMailHtml(result.fields),
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
