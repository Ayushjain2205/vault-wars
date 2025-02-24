"use client";

import { ArrowUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { VaultDetails } from "@/types/vault-details";
import { cn } from "@/lib/utils";

interface VaultMetricsProps {
  vault: VaultDetails;
}

export function VaultMetrics({ vault }: VaultMetricsProps) {
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
    <div className="bg-[#0D0E19] border border-[#04D9FF]/20 rounded-lg p-4">
      <h2 className="font-nav text-sm uppercase text-[#04D9FF] mb-4">
        Metrics
      </h2>

      <div className="space-y-4">
        {/* TVL Section */}
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <div className="text-xs text-gray-400">Total Value Locked</div>
            <div className="flex items-center gap-1 text-green-500 text-xs">
              <ArrowUp className="h-3 w-3" />
              2.5%
            </div>
          </div>
          <div className="font-logo text-xl text-white mb-2">
            {formatCurrency(vault.tvl)}
          </div>
          <Progress value={75} className="h-1" />
        </div>

        {/* ROI Grid */}
        <div className="grid grid-cols-3 gap-2 py-2">
          <div>
            <div className="text-xs text-gray-400 mb-1">7D ROI</div>
            <div
              className={cn(
                "font-medium",
                vault.roi["7d"] >= 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {formatPercentage(vault.roi["7d"])}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">30D ROI</div>
            <div
              className={cn(
                "font-medium",
                vault.roi["30d"] >= 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {formatPercentage(vault.roi["30d"])}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">90D ROI</div>
            <div
              className={cn(
                "font-medium",
                vault.roi["90d"] >= 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {formatPercentage(vault.roi["90d"])}
            </div>
          </div>
        </div>

        {/* Risk Level */}
        <div className="pt-2">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400">Risk Level</div>
            <div
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                vault.riskLevel === "low"
                  ? "bg-green-500/20 text-green-500"
                  : vault.riskLevel === "medium"
                  ? "bg-yellow-500/20 text-yellow-500"
                  : "bg-red-500/20 text-red-500"
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
