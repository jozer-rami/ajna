"use client";
import { useState } from "react";
import { BackButton } from "@/components/BackButton";
import { useRouter } from "next/navigation";
import { Button, Input } from "@worldcoin/mini-apps-ui-kit-react";
import Image from "next/image";

export default function BirthPage() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert birth date to bytes
    const encoder = new TextEncoder();
    const data = encoder.encode(birthDate);
    
    // Generate hash using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const birthHash = '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Store in localStorage
    localStorage.setItem('birthHash', birthHash);
    
    if (process.env.NODE_ENV !== "production") {
      console.log("Birth info submitted", { birthDate, birthHash });
    }
    router.push("/card-selection");
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Image
        src="/birth.jpeg"
        alt="Birth background"
        fill
        priority
        className="object-cover"
      />
      <div className="relative z-10 flex min-h-screen flex-col p-4">
        <BackButton />
        <div className="flex-1 flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
            <h1 className="text-xl font-semibold text-center">Enter your birth date</h1>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              label="Birth date"
              variant="floating-label"
              required
            />
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
