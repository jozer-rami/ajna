import Link from "next/link";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { BackButton } from "@/components/BackButton";

export default function UniversePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <img
        src="/universe.svg"
        alt="Universe animation"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="p-4">
          <BackButton />
        </div>
        <div className="flex-1" />
        <footer className="p-4 flex justify-center">
          <Link href="/start">
            <Button variant="primary" size="lg">Start</Button>
          </Link>
        </footer>
      </div>
    </main>
  );
}
