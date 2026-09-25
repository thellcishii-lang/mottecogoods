// app/api/payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Client, Environment } from "square";

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment:
    process.env.NODE_ENV === "production"
      ? Environment.Production
      : Environment.Sandbox,
});

export async function POST(req: NextRequest) {
  const { sourceId, amount, currency } = await req.json();

  try {
    const { result } = await client.paymentsApi.createPayment({
      sourceId,
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: BigInt(amount),
        currency: currency as any,
      },
    });

    // ここで自前DBに注文を記録する
    // await db.orders.create({ ... })

    return NextResponse.json({ success: true, paymentId: result.payment.id });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
