import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { savePaymentReference } from "@/lib/paymentStore";

export async function POST(req: NextRequest) {
  const uuid = crypto.randomUUID().replace(/-/g, "");

  // Save the generated reference so we can verify the payment later
  await savePaymentReference(uuid);
  cookies().set({
    name: "payment-nonce",
    value: uuid,
    httpOnly: true,
  });

  console.log(uuid);

  return NextResponse.json({ id: uuid });
}
