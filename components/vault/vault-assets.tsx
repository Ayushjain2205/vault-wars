"use client";

import { useState } from "react";
import { Pie, PieChart } from "recharts";
import { Vault } from "@/components/vault";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import type { VaultDetails } from "@/types/vault-details";

// Define color palette with opacity
const ASSET_COLORS = {
  primary: [
    "#04D9FF", // Cyan
    "#FF10F0", // Pink
    "#FFD119", // Yellow
    "#9D4EDD", // Purple
    "#00FF9D", // Green
  ],
  secondary: [
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#8B5CF6", // Violet
  ],
};

// Helper to add opacity to hex colors
const addOpacity = (hex: string, opacity: number) => {
  // Convert opacity (0-100) to hex (00-FF)
  const alpha = Math.round((opacity / 100) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${alpha}`;
};

interface VaultAssetsProps {
  vault: VaultDetails;
}

export function VaultAssets({ vault }: VaultAssetsProps) {
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  // Get color for asset based on index
  const getAssetColor = (index: number, symbol: string) => {
    // First try to match common symbols to primary colors
    const commonAssets: Record<string, string> = {
      ETH: ASSET_COLORS.primary[0],
      USDC: ASSET_COLORS.primary[1],
      stETH: ASSET_COLORS.primary[2],
      WBTC: ASSET_COLORS.primary[3],
      DAI: ASSET_COLORS.primary[4],
    };

    if (symbol in commonAssets) {
      return addOpacity(commonAssets[symbol], 90); // 90% opacity
    }

    // For other assets, cycle through secondary colors
    const secondaryIndex = index % ASSET_COLORS.secondary.length;
    return addOpacity(ASSET_COLORS.secondary[secondaryIndex], 90);
  };

  const chartData = vault.composition.assets.map((asset, index) => ({
    name: asset.asset,
    value: asset.value,
    fill: getAssetColor(index, asset.symbol),
  }));

  const chartConfig = {
    name: {
      label: "Asset",
    },
    value: {
      label: "Value",
    },
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-md shadow-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="font-medium text-gray-900">
              {payload[0].name}:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(payload[0].value)}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Vault
      mode="content"
      size="xl"
      seed={vault.id}
      onStateChange={setIsVaultOpen}
    >
      {isVaultOpen && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ChartContainer
            config={chartConfig}
            className="aspect-square w-full max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                content={<CustomTooltip />}
                wrapperStyle={{ outline: "none" }}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name }) => name}
                labelLine={false}
                animationBegin={0}
                animationDuration={800}
              />
            </PieChart>
          </ChartContainer>
        </div>
      )}
    </Vault>
  );
}
