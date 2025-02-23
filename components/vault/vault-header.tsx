"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { VaultBadge } from "@/components/leaderboard/vault-badge";
import type { VaultDetails } from "@/types/vault-details";
import { cn } from "@/lib/utils";

interface VaultHeaderProps {
  vault: VaultDetails;
}

export function VaultHeader({ vault }: VaultHeaderProps) {
  const formatPercentage = (value: number) => {
    const formatted = value.toFixed(1);
    return value >= 0 ? `+${formatted}%` : `${formatted}%`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="cyber-panel p-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <h1 className="font-logo text-4xl text-[#04D9FF] cyber-text mb-2">
              {vault.name}
            </h1>
            <div className="flex items-center gap-2">
              <StatusBadge status="active" />
              <div className="flex gap-2">
                {vault.badges.map((badge) => (
                  <VaultBadge key={badge} type={badge as any} />
                ))}
              </div>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-[#04D9FF] text-[#0D0E19] hover:bg-[#04D9FF]/90"
          >
            Deposit
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="cyber-panel p-4">
            <div className="text-sm text-gray-400">TVL</div>
            <div className="font-logo text-xl text-white">
              {formatCurrency(vault.tvl)}
            </div>
          </div>
          <div className="cyber-panel p-4">
            <div className="text-sm text-gray-400">Total Yield</div>
            <div
              className={cn(
                "font-logo text-xl",
                vault.totalYield >= 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {formatPercentage(vault.totalYield)}
            </div>
          </div>
          <div className="cyber-panel p-4">
            <div className="text-sm text-gray-400">30D ROI</div>
            <div
              className={cn(
                "font-logo text-xl",
                vault.roi["30d"] >= 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {formatPercentage(vault.roi["30d"])}
            </div>
          </div>
          <div className="cyber-panel p-4">
            <div className="text-sm text-gray-400">Risk Level</div>
            <div
              className={cn(
                "font-logo text-xl",
                vault.riskLevel === "low"
                  ? "text-green-500"
                  : vault.riskLevel === "medium"
                  ? "text-yellow-500"
                  : "text-red-500"
              )}
            >
              {vault.riskLevel.charAt(0).toUpperCase() +
                vault.riskLevel.slice(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
