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
    localStorage.setItem('selectedCard', card.toString());
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
        <div className="text-center mt-8 mb-4">
          <p className="text-white text-xl">Feel which card resonates within.</p>
          <p className="text-white text-xl mt-2">Click the card that recognizes you.</p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col gap-4 px-4 w-full max-w-[240px]">
            {cards.map((card) => (
              <button
                key={card}
                onClick={() => handleSelect(card)}
                className={`w-full border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                  selected === card ? "border-amber scale-105" : "border-transparent"
                }`}
              >
                <Image
                  src={`/card-${card}.png`}
                  alt={`card ${card}`}
                  width={200}
                  height={300}
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
