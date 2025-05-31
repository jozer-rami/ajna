"use client";
import { useRouter } from "next/navigation";
import { handlePay } from "@/components/Pay";
import { useState } from "react";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { BackButton } from "@/components/BackButton";

export default function StartPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onButtonClick = async () => {
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
    <main className="flex min-h-screen flex-col p-4">
      <BackButton />
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2">Welcome to Ajna</h1>
          <p className="text-base">Choose an energy to work today</p>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-[320px]">
          {/* Love Button */}
          <Button onClick={onButtonClick} disabled={loading} variant="primary" size="lg" className="flex flex-col items-center">
            <span className="mb-1">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.04 3 12.5 3.99 13 5.36C13.5 3.99 14.96 3 16.5 3C19.5 3 22 5.5 22 8.5C22 13.5 12 21 12 21Z" fill="currentColor"/></svg>
            </span>
            <span>Love</span>
          </Button>
          {/* Money Button */}
          <Button onClick={onButtonClick} disabled={loading} variant="primary" size="lg" className="flex flex-col items-center">
            <span className="mb-1">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2"/></svg>
            </span>
            <span>Money</span>
          </Button>
          {/* Wellbeing Button */}
          <Button onClick={onButtonClick} disabled={loading} variant="primary" size="lg" className="flex flex-col items-center">
            <span className="mb-1">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="17" rx="7" ry="3" fill="none" stroke="currentColor"/><path d="M12 17v-7" stroke="currentColor"/><path d="M12 10c-2-2-2-5 0-7 2 2 2 5 0 7z" fill="none" stroke="currentColor"/><path d="M12 13c1.5-1.5 4-1.5 4-4.5" fill="none" stroke="currentColor"/><path d="M12 13c-1.5-1.5-4-1.5-4-4.5" fill="none" stroke="currentColor"/></svg>
            </span>
            <span>Wellbeing</span>
          </Button>
          {loading && <p className="text-center">Processing payment...</p>}
        </div>
      </div>
    </main>
  );
} 