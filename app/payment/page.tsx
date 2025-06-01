"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { BackButton } from "@/components/BackButton";
import { handlePay } from "@/components/Pay";
import { RandomMessage } from "@/components/RandomMessage";
import { MintNFT } from "@/components/MintNFT";
import Image from "next/image";

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const onPay = async () => {
    setLoading(true);
    const result = await handlePay();
    setLoading(false);
    if (result) {
      setPaymentComplete(true);
    } else {
      alert("Payment failed or was cancelled.");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Image
        src="/message-revealed-bg.jpeg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />
      <div className="relative z-10 flex min-h-screen flex-col p-4 gap-6">
        <BackButton />
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <RandomMessage />
          {!paymentComplete ? (
            <>
              <Button onClick={onPay} disabled={loading} variant="primary" size="lg">
                Pay to mint your NFT card
              </Button>
              {loading && <p className="text-center">Processing payment...</p>}
            </>
          ) : (
            <div className="w-full max-w-sm mx-auto">
              <h2 className="text-xl font-semibold text-center text-white mb-4">
                Payment Complete! Mint your NFT
              </h2>
              <MintNFT />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
