// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, address, product, quantity, message } = data;

    if (!name || !email || !address || !product || !quantity) {
      return NextResponse.json(
        { success: false, error: "必須項目が不足しています" },
        { status: 400 }
      );
    }

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
