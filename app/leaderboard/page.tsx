"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { FilterPanel } from "@/components/leaderboard/filter-panel";
import { LeaderboardPagination } from "@/components/leaderboard/leaderboard-pagination";
import { mockVaults } from "@/lib/mock-vaults";
import type { LeaderboardFilters } from "@/types/leaderboard";

const defaultFilters: LeaderboardFilters = {
  timeRange: "all",
  dateRange: {
    from: undefined,
    to: undefined,
  },
  search: "",
  page: 1,
  pageSize: 10,
  sort: {
    field: "roi",
    direction: "desc",
  },
  badges: [],
  riskLevels: [],
  strategies: [],
};

export default function LeaderboardPage() {
  const [filters, setFilters] = useState<LeaderboardFilters>(defaultFilters);

  const filteredVaults = mockVaults
    .filter((vault) => {
      const matchesSearch =
        filters.search === "" ||
        vault.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesBadges =
        filters.badges.length === 0 ||
        filters.badges.some((badge) => vault.badges.includes(badge));
      const matchesRisk =
        filters.riskLevels.length === 0 ||
        filters.riskLevels.includes(vault.riskLevel);
      const matchesStrategy =
        filters.strategies.length === 0 ||
        filters.strategies.includes(vault.strategy);

      return matchesSearch && matchesBadges && matchesRisk && matchesStrategy;
    })
    .sort((a, b) => {
      const direction = filters.sort.direction === "asc" ? 1 : -1;
      switch (filters.sort.field) {
        case "tvl":
          return (a.tvl - b.tvl) * direction;
        case "roi":
          return (a.roi["30d"] - b.roi["30d"]) * direction;
        case "yield":
          return (a.totalYield - b.totalYield) * direction;
        default:
          return 0;
      }
    });

  const totalVaults = filteredVaults.length;
  const totalPages = Math.ceil(totalVaults / filters.pageSize);
  const paginatedVaults = filteredVaults.slice(
    (filters.page - 1) * filters.pageSize,
    filters.page * filters.pageSize
  );

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
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
          />
          <div className="space-y-4">
            <div className="text-sm text-gray-400">
              Showing {(filters.page - 1) * filters.pageSize + 1}-
              {Math.min(filters.page * filters.pageSize, totalVaults)} of{" "}
              {totalVaults} vaults
            </div>
            <LeaderboardTable
              vaults={paginatedVaults}
              timeRange={filters.timeRange}
              currentPage={filters.page}
            />
            <LeaderboardPagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={(page) => setFilters({ ...filters, page })}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
