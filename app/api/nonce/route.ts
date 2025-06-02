import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
export function GET() {
  const nonce = randomBytes(16).toString("hex");
  cookies().set("siwe_nonce", nonce, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 300,
  });
  return NextResponse.json({ nonce });
}
