"use client";

import { useEffect, useState } from "react";
import { BackButton } from "@/components/BackButton";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

export default function WaitPage() {
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    const storedHash = typeof window !== "undefined" ? localStorage.getItem("mintTxHash") : null;
    if (storedHash) {
      setTxHash(storedHash);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-4 gap-6">
      <BackButton />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        {txHash ? (
          <Button asChild variant="primary" size="lg">
            <a
              href={`https://blockscout.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Transaction on Blockscout
            </a>
          </Button>
        ) : (
          <p className="text-center">Minting NFT...</p>
        )}
      </div>
    </main>
  );
}
