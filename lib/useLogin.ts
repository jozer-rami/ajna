"use client";
import { MiniKit, ResponseEvent, MiniAppWalletAuthSuccessPayload } from "@worldcoin/minikit-js";
import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { playBackgroundVideo } from "./playVideo";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nonce, setNonce] = useState<string | null>(null);

  const handleLogin = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Tried to invoke 'login', but MiniKit is not installed.");
      }
      return null;
    }

    setLoading(true);
    playBackgroundVideo();

    try {
      const res = await fetch(`/api/nonce`);
      const { nonce: newNonce } = await res.json();
      setNonce(newNonce);

      // Send the wallet auth command
      MiniKit.commands.walletAuth({
        nonce: newNonce,
        requestId: "0",
        expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        statement: "Login to Ajna",
      });
    } catch (error) {
      console.error("Error during login:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    const handleWalletAuthResponse = async (payload: any) => {
      if (payload.status === "error") {
        console.error("Wallet auth error:", payload);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/complete-siwe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payload: payload as MiniAppWalletAuthSuccessPayload,
            nonce,
          }),
        });

        const json = await response.json();
        
        if (response.ok) {
          router.push("/universe");
        }
      } catch (error) {
        console.error("Error completing SIWE:", error);
      } finally {
        setLoading(false);
      }
    };

    // Subscribe to wallet auth responses
    MiniKit.subscribe(ResponseEvent.MiniAppWalletAuth, handleWalletAuthResponse);

    // Cleanup subscription
    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppWalletAuth);
    };
  }, [router, nonce]);

  return { handleLogin, loading };
}; 