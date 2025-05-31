import { VerifyButton } from "@/components/VerifyButton";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/background.webm" type="video/webm" />
      </video>
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1" />
        <footer className="p-4 flex justify-center">
          <VerifyButton />
        </footer>
      </div>
    </main>
  );
}
