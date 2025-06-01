"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { BackButton } from "@/components/BackButton";
import { handlePay } from "@/components/Pay";
import { RandomMessage } from "@/components/RandomMessage";
import Image from "next/image";

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onPay = async () => {
    setLoading(true);
    const result = await handlePay();
    setLoading(false);
    if (result) {
      router.push("/message");
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
          <Button onClick={onPay} disabled={loading} variant="primary" size="lg">
            Pay to mint your NFT card
          </Button>
          {loading && <p className="text-center">Processing payment...</p>}
        </div>
      </div>
    </main>
  );
}
