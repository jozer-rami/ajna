import { PayBlock } from "@/components/Pay";
import { SignIn } from "@/components/SignIn";
import { VerifyBlock } from "@/components/Verify";
import Link from "next/link";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      <SignIn />
      <VerifyBlock />
      <PayBlock />
      <Link href="/start">
        <Button variant="primary" size="lg" className="mt-6 text-black">Start</Button>
      </Link>
    </main>
  );
}
