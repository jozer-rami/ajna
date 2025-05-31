import { VerifyButton } from "@/components/VerifyButton";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <img
        src="/background.svg"
        alt="Background animation"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1" />
        <footer className="p-4 flex justify-center">
          <VerifyButton />
        </footer>
      </div>
    </main>
  );
}
