"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { BackButton } from "@/components/BackButton";
import { handlePay } from "@/components/Pay";

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
    <main className="flex min-h-screen flex-col p-4 gap-6">
      <BackButton />
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <Button onClick={onPay} disabled={loading} variant="primary" size="lg">
          Pay
        </Button>
        {loading && <p className="text-center">Processing payment...</p>}
      </div>
    </main>
  );
}
