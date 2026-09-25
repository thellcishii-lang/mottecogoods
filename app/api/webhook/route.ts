import { NextRequest, NextResponse } from "next/server";
import { WebhooksHelper } from "square";

export async function POST(req: NextRequest) {
  const body = await req.text(); // raw bodyが必須
  const signature = req.headers.get("x-square-hmacsha256-signature")!;
  const notificationUrl = process.env.SQUARE_WEBHOOK_URL!;

  const isValid = await WebhooksHelper.verifySignature({
    requestBody: body,
    signatureHeader: signature,
    signatureKey: process.env.SQUARE_WEBHOOK_SIGNATURE_KEY!,
    notificationUrl,
  });

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);
  if (event.type === "payment.updated" && event.data.object.payment.status === "COMPLETED") {
    // 注文確定、在庫減算、確認メール送信
    await confirmOrder(event.data.object.payment);
  }

  return NextResponse.json({ ok: true });
}
