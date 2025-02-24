"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { VaultCard } from "@/components/vault/vault-card";
import { mockVaults } from "@/lib/mock-vaults";
import type { VaultStats } from "@/types/leaderboard";

export default function MyVaultsPage() {
  const [sortBy, setSortBy] = useState<"recent" | "performance">("recent");
  const userVaults = mockVaults.slice(0, 6); // Mock first 6 vaults as user's vaults

  return (
    <div className="min-h-screen bg-[#0D0E19]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-logo text-3xl text-[#04D9FF]">My Vaults</h1>
            <p className="mt-2 text-gray-400">
              Manage and monitor your AI-powered vaults. Track performance,
              adjust strategies, and optimize returns.
            </p>
          </div>
          <Link href="/create">
            <Button className="bg-[#04D9FF] text-[#0D0E19] hover:bg-[#04D9FF]/90 font-medium">
              <Plus className="mr-2 h-4 w-4" />
              New Vault
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy("recent")}
              className={`${
                sortBy === "recent"
                  ? "bg-[#04D9FF]/10 text-[#04D9FF] border-[#04D9FF]"
                  : "bg-transparent text-gray-400 border-[#04D9FF]/30 hover:text-[#04D9FF] hover:border-[#04D9FF]"
              }`}
            >
              Recently Updated
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy("performance")}
              className={`${
                sortBy === "performance"
                  ? "bg-[#04D9FF]/10 text-[#04D9FF] border-[#04D9FF]"
                  : "bg-transparent text-gray-400 border-[#04D9FF]/30 hover:text-[#04D9FF] hover:border-[#04D9FF]"
              }`}
            >
              Best Performing
            </Button>
          </div>
        </div>

        {userVaults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">
              You haven't created any vaults yet.
            </p>
            <Link href="/create">
              <Button className="bg-[#04D9FF] text-[#0D0E19] hover:bg-[#04D9FF]/90">
                Create Your First Vault
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userVaults
              .sort((a, b) =>
                sortBy === "recent"
                  ? (b.performance[b.performance.length - 1]?.timestamp || 0) -
                    (a.performance[a.performance.length - 1]?.timestamp || 0)
                  : b.totalYield - a.totalYield
              )
              .map((vault) => (
                <VaultCard key={vault.id} vault={vault} />
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
