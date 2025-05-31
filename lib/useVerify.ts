"use client";
import {
  MiniKit,
  VerificationLevel,
  ISuccessResult,
  MiniAppVerifyActionErrorPayload,
  IVerifyResponse,
} from "@worldcoin/minikit-js";
import { useCallback, useState } from "react";

export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel;
};

export const useVerify = (verifyPayload: VerifyCommandInput) => {
  const [verifyResponse, setVerifyResponse] = useState<
    MiniAppVerifyActionErrorPayload | IVerifyResponse | null
  >(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Tried to invoke 'verify', but MiniKit is not installed.");
      }
      return null;
    }

    setLoading(true);
    const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

    if (finalPayload.status === "error") {
      if (process.env.NODE_ENV !== "production") {
        console.log("Command error", finalPayload);
      }
      setVerifyResponse(finalPayload);
      setLoading(false);
      return finalPayload;
    }

    const verifyRes = await fetch(`/api/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payload: finalPayload as ISuccessResult,
        action: verifyPayload.action,
        signal: verifyPayload.signal,
      }),
    });

    const json = await verifyRes.json();
    setVerifyResponse(json);
    setLoading(false);
    return json;
  }, [verifyPayload]);

  return { handleVerify, verifyResponse, loading };
};
