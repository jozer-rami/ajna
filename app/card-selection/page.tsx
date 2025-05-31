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
      <Image
        src="/card-selection-bg.svg"
        alt="blue background"
        fill
        priority
        className="object-cover"
      />
      <div className="relative z-10 flex min-h-screen flex-col p-4">
        <BackButton />
        <div className="flex flex-1 items-center justify-center gap-4">
          {cards.map((card) => (
            <button
              key={card}
              onClick={() => handleSelect(card)}
              className={`border-2 rounded overflow-hidden ${selected === card ? "border-amber" : "border-transparent"}`}
            >
              <Image
                src={`/card-${card}.svg`}
                alt={`card ${card}`}
                width={100}
                height={150}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
