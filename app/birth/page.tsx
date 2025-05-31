"use client";
import { useState } from "react";
import { BackButton } from "@/components/BackButton";
import { useRouter } from "next/navigation";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import Image from "next/image";

export default function BirthPage() {
  const router = useRouter();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [place, setPlace] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { day, month, year, place };
    if (process.env.NODE_ENV !== "production") {
      console.log("Birth info submitted", data);
    }
    router.push("/message");
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Image
        src="/birth.svg"
        alt="Birth background"
        fill
        priority
        className="object-cover"
      />
      <div className="relative z-10 flex min-h-screen flex-col p-4">
        <BackButton />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto w-full">
          <h1 className="text-xl font-semibold text-center">Enter your birth information</h1>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="border p-2 rounded flex-1"
            min="1"
            max="31"
            required
          />
          <input
            type="number"
            placeholder="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2 rounded flex-1"
            min="1"
            max="12"
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 rounded flex-1"
            min="1900"
            max="2100"
            required
          />
        </div>
        <input
          type="text"
          placeholder="Birth place"
          list="birth-places"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <datalist id="birth-places">
          <option value="New York, USA" />
          <option value="London, UK" />
          <option value="Tokyo, Japan" />
          <option value="Sydney, Australia" />
          <option value="Paris, France" />
        </datalist>
        <Button type="submit" variant="primary" size="lg">
          Submit
        </Button>
      </form>
      </div>
    </main>
  );
}
