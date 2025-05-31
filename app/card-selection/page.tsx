"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BackButton } from "@/components/BackButton";

export default function CardSelectionPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (card: number) => {
    setSelected(card);
    router.push(`/ritual-collection?card=${card}`);
  };

  const cards = [1, 2, 3];

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
        <source src="/card-selection-bg.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex min-h-screen flex-col p-4">
        <BackButton />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col gap-6 px-4 w-full max-w-sm">
            {cards.map((card) => (
              <button
                key={card}
                onClick={() => handleSelect(card)}
                className={`w-full border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                  selected === card ? "border-amber scale-105" : "border-transparent"
                }`}
              >
                <Image
                  src={`/card-${card}.jpeg`}
                  alt={`card ${card}`}
                  width={300}
                  height={450}
                  className="w-full h-auto object-contain"
                  priority
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
