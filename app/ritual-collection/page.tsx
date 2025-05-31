"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

export default function RitualCollectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const card = searchParams.get("card");

  const handleReveal = () => {
    router.push("/payment");
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        id="background-video"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/ritual-collection-bg.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex min-h-screen flex-col p-4">
        <BackButton />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">Ritual Collection</h1>
        </div>
        <footer className="flex justify-center p-4">
          <Button onClick={handleReveal} variant="primary" size="lg">
            Reveal
          </Button>
        </footer>
      </div>
    </main>
  );
}
