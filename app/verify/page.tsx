"use client";
import { VerifyButton } from "@/components/VerifyButton";
import { BackButton } from "@/components/BackButton";

export default function VerifyPage() {
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
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex flex-col min-h-screen p-4">
        <div className="flex flex-col items-center gap-4">
          <BackButton />
          <VerifyButton />
        </div>
        <div className="flex-1" />
      </div>
    </main>
  );
} 