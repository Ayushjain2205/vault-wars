"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { LeaderboardFilters } from "@/components/leaderboard/leaderboard-filters";
import { mockVaults } from "@/lib/mock-vaults";
import type { LeaderboardFilters as Filters } from "@/types/leaderboard";

export default function LeaderboardPage() {
  const [filters, setFilters] = useState<Filters>({
    timeRange: "7d",
    search: "",
  });

  const filteredVaults = mockVaults
    .filter((vault) => {
      const matchesSearch =
        filters.search === "" ||
        vault.name.toLowerCase().includes(filters.search.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      // Sort by ROI for the selected time range
      const roiA = a.roi[filters.timeRange === "7d" ? "7d" : "30d"];
      const roiB = b.roi[filters.timeRange === "7d" ? "7d" : "30d"];
      return roiB - roiA;
    });

  return (
    <div className="min-h-screen bg-[#0D0E19]">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="inline-block">
            <h1 className="font-logo text-4xl text-[#04D9FF] cyber-text mb-1">
              Vault Leaderboard
            </h1>
            <div className="h-1 w-1/3 bg-gradient-to-r from-[#04D9FF] to-[#FF10F0]" />
          </div>
          <p className="mt-4 max-w-2xl text-lg text-gray-400 leading-relaxed">
            Top performing vaults ranked by yield and total value locked (TVL).
            Track the best strategies and discover winning combinations.
          </p>
        </div>

        <div className="space-y-6">
          <LeaderboardFilters filters={filters} onFiltersChange={setFilters} />
          <LeaderboardTable
            vaults={filteredVaults}
            timeRange={filters.timeRange}
          />
        </div>
      </main>
    </div>
  );
}
