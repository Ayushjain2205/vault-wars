"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import { VaultHeader } from "@/components/vault/vault-header";
import { mockVaults } from "@/lib/mock-vaults";

export default function VaultPage() {
  const { id } = useParams();
  const vault = mockVaults.find((v) => v.id === id);

  if (!vault) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0D0E19]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <VaultHeader vault={vault} />
      </main>
    </div>
  );
}
