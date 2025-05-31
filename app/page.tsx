"use client";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import Link from "next/link";

export default function Home() {
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
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1" />
        <footer className="p-4 flex justify-center">
          <Link href="/verify">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
        </footer>
      </div>
    </main>
  );
}
