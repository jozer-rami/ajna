"use client";
import { VerificationLevel } from "@worldcoin/minikit-js";
import { useVerify, VerifyCommandInput } from "@/lib/useVerify";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

const verifyPayload: VerifyCommandInput = {
  action: "login",
  signal: "",
  verification_level: VerificationLevel.Orb,
};

export const VerifyButton = () => {
  const { handleVerify, verifyResponse } = useVerify(verifyPayload);

  return (
    <div className="flex flex-col items-center">
      <Button onClick={handleVerify} variant="primary" size="lg">
        Verify with World ID
      </Button>
      {verifyResponse && (
        <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto max-w-full">
          <code>{JSON.stringify(verifyResponse, null, 2)}</code>
        </pre>
      )}
    </div>
  );
};
