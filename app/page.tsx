"use client";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Image
        src="/home.jpeg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />
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
