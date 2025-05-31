"use client";
import { useSearchParams } from "next/navigation";
import { BackButton } from "@/components/BackButton";

export default function RitualCollectionPage() {
  const searchParams = useSearchParams();
  const card = searchParams.get("card");

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
      <div className="relative z-10 flex min-h-screen flex-col p-4 gap-6">
        <BackButton />
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <h1 className="text-2xl font-semibold">Ritual Collection</h1>
          {card && <p>You selected card {card}</p>}
        </div>
      </div>
    </main>
  );
}
