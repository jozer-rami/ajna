"use client"; // Required for Next.js

import { MiniKit } from "@worldcoin/minikit-js";
import { ReactNode, useEffect } from "react";

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    MiniKit.install();
    if (process.env.NODE_ENV !== "production") {
      console.log(MiniKit.isInstalled());
    }
  }, []);

  return <>{children}</>;
}
