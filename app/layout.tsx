import type { Metadata } from "next";
import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";
import dynamic from "next/dynamic";
import NextAuthProvider from "@/components/next-auth-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(
    () => import("../components/Eruda").then((c) => c.ErudaProvider),
    {
      ssr: false,
    }
  );
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <ErudaProvider>
            <MiniKitProvider>
              {children}
            </MiniKitProvider>
          </ErudaProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
