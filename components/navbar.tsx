"use client";
import { Vault } from "@/components/vault";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    // Set seed once when component mounts
    setSeed(new Date().toISOString());
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#04D9FF]/30 bg-[#0D0E19]/80 backdrop-blur">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-16 h-16 -my-4 flex items-center justify-center">
              <Vault size="xs" seed={seed} />
            </div>
            <span className="font-logo text-2xl text-[#04D9FF] cyber-text">
              Vault Wars
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/create"
              className="group relative font-nav text-sm font-semibold tracking-wider text-[#04D9FF]"
            >
              <span className="relative z-10 uppercase">Create Vault</span>
              <div className="absolute inset-0 -z-0 h-full w-0 bg-[#04D9FF]/10 transition-all group-hover:w-full" />
            </Link>
            <Link
              href="#"
              className="group relative font-nav text-sm font-semibold tracking-wider text-[#04D9FF]"
            >
              <span className="relative z-10 uppercase">Leaderboard</span>
              <div className="absolute inset-0 -z-0 h-full w-0 bg-[#04D9FF]/10 transition-all group-hover:w-full" />
            </Link>
            <Link
              href="#"
              className="group relative font-nav text-sm font-semibold tracking-wider text-[#04D9FF]"
            >
              <span className="relative z-10 uppercase">My Vaults</span>
              <div className="absolute inset-0 -z-0 h-full w-0 bg-[#04D9FF]/10 transition-all group-hover:w-full" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
