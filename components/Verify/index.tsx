"use client";
import { VerificationLevel } from "@worldcoin/minikit-js";
import { useVerify, VerifyCommandInput } from "@/lib/useVerify";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

const verifyPayload: VerifyCommandInput = {
  action: "login", // This is your action ID from the Developer Portal
  signal: "",
  verification_level: VerificationLevel.Orb, // Orb | Device
};

export const VerifyBlock = () => {
  const { handleVerify, verifyResponse } = useVerify(verifyPayload);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">Verify Identity</h2>
      <Button onClick={handleVerify} variant="primary" size="lg">
        Verify with World ID
      </Button>
      {verifyResponse && (
        <>
          {"status" in verifyResponse && (verifyResponse as any).status === 200 && (
            <p className="text-green-600">Verification success!</p>
          )}
        <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto max-w-full">
          <code>{JSON.stringify(verifyResponse, null, 2)}</code>
        </pre>
        </>
      )}
    </div>
  );
};
