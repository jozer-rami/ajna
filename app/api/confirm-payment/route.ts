import { MiniAppPaymentSuccessPayload } from "@worldcoin/minikit-js";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getLatestPaymentReference } from "@/lib/db";

interface IRequestPayload {
  payload: MiniAppPaymentSuccessPayload;
}

export async function POST(req: NextRequest) {
  const { payload } = (await req.json()) as IRequestPayload;

  // Fetch the reference stored during /initiate-payment using the authenticated user
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;

  let reference = getLatestPaymentReference(userId);

  if (!reference) {
    // Fallback to cookie if no record exists (legacy behaviour)
    reference = cookies().get("payment-nonce")?.value || null;
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(reference);
  }

  if (!reference) {
    return NextResponse.json({ success: false });
  }
  if (process.env.NODE_ENV !== "production") {
    console.log(payload);
  }
  // 1. Check that the transaction we received from the mini app is the same one we sent
  if (payload.reference === reference) {
    const response = await fetch(
      `https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transaction_id}?app_id=${process.env.APP_ID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.DEV_PORTAL_API_KEY}`,
        },
      }
    );
    const transaction = await response.json();
    // 2. Here we optimistically confirm the transaction.
    // Otherwise, you can poll until the status == mined
    if (transaction.reference == reference && transaction.status != "failed") {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  }
}
