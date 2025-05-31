"use client";
import { MiniKit } from "@worldcoin/minikit-js";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { useRouter } from "next/navigation";
import { playBackgroundVideo } from "@/lib/playVideo";
import { useState } from "react";

export const LoginButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    setLoading(true);
    playBackgroundVideo();

    const res = await fetch(`/api/nonce`);
    const { nonce } = await res.json();

    const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
      nonce,
      requestId: "0",
      expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      statement: "Login to Ajna",
    });

    if (finalPayload.status !== "error") {
      await fetch("/api/complete-siwe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: finalPayload, nonce }),
      });
      router.push("/universe");
    }

    setLoading(false);
  };

  return (
    <Button onClick={handleLogin} variant="primary" size="lg" disabled={loading}>
      Login with Wallet
    </Button>
  );
};
