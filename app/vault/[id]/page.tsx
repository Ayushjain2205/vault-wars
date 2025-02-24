"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import { VaultHeader } from "@/components/vault/vault-header";
import { VaultAssets } from "@/components/vault/vault-assets";
import { VaultActivity } from "@/components/vault/vault-activity";
import { VaultMetrics } from "@/components/vault/vault-metrics";
import { VaultPerformance } from "@/components/vault/vault-performance";
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
        <div className="grid gap-4">
          {/* Top Section */}
          <div className="grid gap-4 md:grid-cols-[400px_1fr]">
            {/* Left Column - Vault Visualization */}
            <div className="h-[450px]">
              <VaultAssets vault={vault} />
            </div>

            {/* Right Column - Header & Details */}
            <div className="grid gap-4 content-start">
              <VaultHeader vault={vault} />
              <div className="grid gap-4 md:grid-cols-2">
                <VaultMetrics vault={vault} />
                <VaultPerformance vault={vault} />
              </div>
            </div>
          </div>

          {/* Bottom Section - Activity */}
          <VaultActivity vault={vault} />
        </div>
      </main>
    </div>
  );
}
