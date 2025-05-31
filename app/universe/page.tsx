"use client";
import { useRouter } from "next/navigation";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { BackButton } from "@/components/BackButton";
import { playBackgroundVideo } from "@/lib/playVideo";

export default function UniversePage() {
  const router = useRouter();

  const handleStart = () => {
    playBackgroundVideo();
    setTimeout(() => {
      router.push("/birth");
    }, 4000);
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
        <source src="/universe.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="p-4">
          <BackButton className="text-white border-white" />
        </div>
        <div className="flex-1" />
        <footer className="p-4 flex justify-center">
          <Button onClick={handleStart} variant="primary" size="lg">Start</Button>
        </footer>
      </div>
    </main>
  );
}
