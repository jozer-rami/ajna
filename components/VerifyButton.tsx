"use client";
import { VerificationLevel } from "@worldcoin/minikit-js";
import { useVerify, VerifyCommandInput } from "@/lib/useVerify";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { useRouter } from "next/navigation";
import { playBackgroundVideo } from "@/lib/playVideo";

const verifyPayload: VerifyCommandInput = {
  action: "login",
  signal: "",
  verification_level: VerificationLevel.Orb,
};

export const VerifyButton = () => {
  const router = useRouter();
  const { handleVerify, verifyResponse } = useVerify(verifyPayload);

  const onVerify = async () => {
    playBackgroundVideo();
    const res = await handleVerify();
    if (res && 'status' in res && (res as any).status === 200) {
      router.push('/universe');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button onClick={onVerify} variant="primary" size="lg">
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
