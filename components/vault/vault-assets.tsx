"use client";

import { useState } from "react";
import { Pie, PieChart } from "recharts";
import { Vault } from "@/components/vault";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import type { VaultDetails } from "@/types/vault-details";

interface VaultAssetsProps {
  vault: VaultDetails;
}

export function VaultAssets({ vault }: VaultAssetsProps) {
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  const chartData = vault.composition.assets.map((asset) => ({
    name: asset.asset,
    value: asset.value,
    fill:
      asset.symbol === "ETH"
        ? "#04D9FF"
        : asset.symbol === "USDC"
        ? "#FF10F0"
        : asset.symbol === "stETH"
        ? "#FFD119"
        : "#9D4EDD",
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
