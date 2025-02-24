"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Vault } from "@/components/vault";
import { VaultBadge } from "@/components/leaderboard/vault-badge";
import { StatusBadge } from "@/components/status-badge";
import type { VaultStats } from "@/types/leaderboard";

interface VaultCardProps {
  vault: VaultStats;
}

export function VaultCard({ vault }: VaultCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Link href={`/vault/${vault.id}`}>
      <motion.div
        whileHover={{ y: -2 }}
        className="group h-[200px] relative border border-[#04D9FF]/20 rounded-lg bg-[#0D0E19] overflow-hidden transition-colors hover:border-[#04D9FF]/40"
      >
        <div className="flex items-center h-full p-6 gap-8">
          {/* Vault Visualization */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32">
              <Vault size="sm" seed={vault.id} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 h-full flex flex-col py-2">
            <div>
              <h3 className="text-2xl font-medium text-white truncate group-hover:text-[#04D9FF] transition-colors mb-4">
                {vault.name}
              </h3>

              <div className="flex flex-wrap gap-2">
                <StatusBadge status="active" />
                {vault.badges.map((badge) => (
                  <VaultBadge key={badge} type={badge} />
                ))}
              </div>
            </div>

            <div className="text-lg mt-auto pt-6">
              <span className="text-gray-400">Total Value:</span>{" "}
              <span className="text-white font-medium">
                {formatCurrency(vault.tvl)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
