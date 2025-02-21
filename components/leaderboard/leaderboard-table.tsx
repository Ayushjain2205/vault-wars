"use client";

import { useState } from "react";
import { Vault } from "@/components/vault";
import { VaultBadge } from "./vault-badge";
import { PerformanceSparkline } from "./performance-sparkline";
import type { VaultStats, TimeRange } from "@/types/leaderboard";
import { cn } from "@/lib/utils";

interface LeaderboardTableProps {
  vaults: VaultStats[];
  timeRange: TimeRange;
  currentPage: number;
}

export function LeaderboardTable({
  vaults,
  timeRange,
  currentPage,
}: LeaderboardTableProps) {
  const [hoveredVault, setHoveredVault] = useState<string | null>(null);

  const formatPercentage = (value: number) => {
    const formatted = value.toFixed(1);
    return value >= 0 ? `+${formatted}%` : `${formatted}%`;
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-[#04D9FF]/30">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#04D9FF]/30">
            <th className="w-24 p-4 text-left text-[#04D9FF] font-medium">
              Rank
            </th>
            <th className="w-[300px] p-4 text-left text-[#04D9FF]">Vault</th>
            <th className="p-4 text-right text-[#04D9FF]">TVL ($)</th>
            <th className="p-4 text-right text-[#04D9FF]">Total Yield</th>
            <th className="p-4 text-right text-[#04D9FF]">
              {timeRange === "7d" ? "7D" : "30D"} ROI
            </th>
            <th className="p-4 text-left text-[#04D9FF]">Performance</th>
            <th className="p-4 text-left text-[#04D9FF]">Badges</th>
          </tr>
        </thead>
        <tbody>
          {vaults.map((vault, index) => (
            <tr
              key={vault.id}
              className="group relative border-b border-[#04D9FF]/10 transition-colors hover:bg-[#04D9FF]/5"
              onMouseEnter={() => setHoveredVault(vault.id)}
              onMouseLeave={() => setHoveredVault(null)}
            >
              <td className="w-24 p-4">
                <span className="text-2xl font-logo text-[#04D9FF]">
                  {index === 0 && currentPage === 1
                    ? "🥇"
                    : index === 1 && currentPage === 1
                    ? "🥈"
                    : index === 2 && currentPage === 1
                    ? "🥉"
                    : (currentPage - 1) * 10 + index + 1}
                </span>
              </td>
              <td className="w-[300px] p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0">
                    <Vault size="xs" seed={vault.id} />
                  </div>
                  <span className="font-medium text-white truncate">
                    {vault.name}
                  </span>
                </div>
              </td>
              <td className="p-4 text-right">
                <span className="font-medium text-white">
                  ${vault.tvl.toLocaleString()}
                </span>
              </td>
              <td className="p-4 text-right">
                <span
                  className={cn(
                    "font-medium",
                    vault.totalYield >= 0 ? "text-green-500" : "text-red-500"
                  )}
                >
                  {formatPercentage(vault.totalYield)}
                </span>
              </td>
              <td className="p-4 text-right">
                <span
                  className={cn(
                    "font-medium",
                    vault.roi[timeRange === "7d" ? "7d" : "30d"] >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {formatPercentage(
                    vault.roi[timeRange === "7d" ? "7d" : "30d"]
                  )}
                </span>
              </td>
              <td className="p-4">
                <PerformanceSparkline data={vault.performance} />
              </td>
              <td className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  {vault.badges.map((badge) => (
                    <VaultBadge key={badge} type={badge} />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
