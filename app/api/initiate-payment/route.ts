import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { insertPayment } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const uuid = crypto.randomUUID().replace(/-/g, "");

  insertPayment(userId, uuid);

  // Store nonce in a short-lived cookie for legacy support
  cookies().set({
    name: "payment-nonce",
    value: uuid,
    httpOnly: true,
    maxAge: 60 * 5,
  });

  if (process.env.NODE_ENV !== "production") {
    console.log(uuid);
  }

  return NextResponse.json({ id: uuid });
}
