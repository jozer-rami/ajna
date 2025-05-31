"use client";

export default function WaitPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="animate-spin h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent" />
      <p className="text-lg text-center">Please wait while we process your request...</p>
    </main>
  );
}
