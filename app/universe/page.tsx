"use client";
import { useRouter } from "next/navigation";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { BackButton } from "@/components/BackButton";
import { playBackgroundVideo } from "@/lib/playVideo";
import { useState } from "react";

export default function UniversePage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    playBackgroundVideo();
    setTimeout(() => {
      router.push("/birth");
    }, 5000);
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
        <div className="flex-1 flex items-center justify-center">
          <Button 
            onClick={handleStart} 
            variant="primary" 
            size="lg"
            className={`transition-opacity duration-1000 ${isStarting ? 'opacity-0' : 'opacity-100'}`}
          >
            Start
          </Button>
        </div>
      </div>
    </main>
  );
}
