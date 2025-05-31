import Link from "next/link";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { BackButton } from "@/components/BackButton";

export default function MessagePage() {
  return (
    <main className="flex min-h-screen flex-col gap-6 p-4">
      <BackButton />
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-semibold text-center">Payment successful!</h1>
        <p className="text-base text-center">Here is your message.</p>
        <Link href="/">
          <Button variant="primary" size="lg">Home</Button>
        </Link>
      </div>
    </main>
  );
} 