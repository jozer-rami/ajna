"use client";
import { MiniKit, VerificationLevel, ISuccessResult, MiniAppVerifyActionErrorPayload, IVerifyResponse } from "@worldcoin/minikit-js";
import { useCallback, useState } from "react";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel; // Default: Orb
};

const verifyPayload: VerifyCommandInput = {
  action: "login",
  signal: "",
  verification_level: VerificationLevel.Orb,
};

export const VerifyButton = () => {
  const [handleVerifyResponse, setHandleVerifyResponse] = useState<MiniAppVerifyActionErrorPayload | IVerifyResponse | null>(null);

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      console.warn("Tried to invoke 'verify', but MiniKit is not installed.");
      return null;
    }

    const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

    if (finalPayload.status === "error") {
      console.log("Command error");
      console.log(finalPayload);
      setHandleVerifyResponse(finalPayload);
      return finalPayload;
    }

    const verifyResponse = await fetch(`/api/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payload: finalPayload as ISuccessResult,
        action: verifyPayload.action,
        signal: verifyPayload.signal,
      }),
    });

    const verifyResponseJson = await verifyResponse.json();
    setHandleVerifyResponse(verifyResponseJson);
    return verifyResponseJson;
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Button onClick={handleVerify} variant="primary" size="lg">
        Verify with World ID
      </Button>
      {handleVerifyResponse && (
        <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto max-w-full">
          <code>{JSON.stringify(handleVerifyResponse, null, 2)}</code>
        </pre>
      )}
    </div>
  );
};
