"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { VaultBadge } from "@/components/leaderboard/vault-badge";
import { Bell, Copy, ExternalLink } from "lucide-react";
import type { VaultDetails } from "@/types/vault-details";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VaultHeaderProps {
  vault: VaultDetails;
}

export function VaultHeader({ vault }: VaultHeaderProps) {
  const [isTracking, setIsTracking] = useState(vault.isTracked);

  return (
    <div className="bg-[#0D0E19] border border-[#04D9FF]/20 rounded-lg p-4">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-3">
          <div>
            <h1 className="font-logo text-3xl text-[#04D9FF] cyber-text">
              {vault.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge status="active" />
              <div className="flex gap-1.5">
                {vault.badges.map((badge) => (
                  <VaultBadge key={badge} type={badge as any} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              Owner:
              <span className="font-mono text-[#04D9FF]">
                {vault.id.split("-")[0]}.eth
              </span>
              <button className="text-gray-500 hover:text-[#04D9FF] transition-colors">
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              Contract:
              <span className="font-mono text-[#04D9FF]">0x1234...5678</span>
              <button className="text-gray-500 hover:text-[#04D9FF] transition-colors">
                <Copy className="h-3.5 w-3.5" />
              </button>
              <a
                href="#"
                className="text-gray-500 hover:text-[#04D9FF] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className={cn(
              "transition-all duration-200",
              "border hover:border-[#04D9FF]",
              isTracking
                ? [
                    "bg-[#04D9FF]/10",
                    "border-[#04D9FF]",
                    "text-[#04D9FF]",
                    "hover:bg-[#04D9FF]/15",
                  ]
                : [
                    "border-[#04D9FF]/20",
                    "text-gray-400",
                    "hover:text-[#04D9FF]",
                    "hover:bg-[#04D9FF]/5",
                  ]
            )}
            onClick={() => setIsTracking(!isTracking)}
          >
            {isTracking ? (
              <>
                <Bell className="h-4 w-4 mr-2" />
                Tracking
              </>
            ) : (
              "Track"
            )}
          </Button>
          <Button className="bg-[#04D9FF] text-[#0D0E19] hover:bg-[#04D9FF]/90">
            Deposit
          </Button>
        </div>
      </div>
    </div>
  );
}
