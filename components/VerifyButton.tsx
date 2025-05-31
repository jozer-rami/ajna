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
  const { handleVerify } = useVerify(verifyPayload);

  const onVerify = async () => {
    playBackgroundVideo();
    const res = await handleVerify();
    if (res && 'status' in res && (res as any).status === 200) {
      router.push('/universe');
    }
  };

  return (
    <Button onClick={onVerify} variant="primary" size="lg">
      Verify with World ID
    </Button>
  );
};
