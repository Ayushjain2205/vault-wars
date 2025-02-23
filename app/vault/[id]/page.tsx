"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import { VaultHeader } from "@/components/vault/vault-header";
import { VaultAssets } from "@/components/vault/vault-assets";
import { mockVaultDetails } from "@/lib/mock-vault-details";

export default function VaultPage() {
  const { id } = useParams();
  const vault = mockVaultDetails; // In a real app, we'd find by ID

  if (!vault) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0D0E19]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-[400px_1fr]">
          <div className="space-y-6">
            <VaultAssets vault={vault} />
          </div>
          <div>
            <VaultHeader vault={vault} />
          </div>
        </div>
      </main>
    </div>
  );
}
