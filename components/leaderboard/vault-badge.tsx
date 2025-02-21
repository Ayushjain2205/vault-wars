import { Trophy, Wallet, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BadgeType } from "@/types/leaderboard";

interface VaultBadgeProps {
  type: BadgeType;
  className?: string;
}

const badgeConfig: Record<
  BadgeType,
  {
    label: string;
    icon: typeof Trophy;
    color: string;
    background: string;
  }
> = {
  "top-gainer": {
    label: "Top Gainer",
    icon: TrendingUp,
    color: "#FF10F0",
    background: "rgba(255, 16, 240, 0.1)",
  },
  whale: {
    label: "Whale Vault",
    icon: Wallet,
    color: "#04D9FF",
    background: "rgba(4, 217, 255, 0.1)",
  },
  consistent: {
    label: "Consistent",
    icon: Trophy,
    color: "#FFD119",
    background: "rgba(255, 209, 25, 0.1)",
  },
};

export function VaultBadge({ type, className }: VaultBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
        "text-xs font-medium border transition-colors",
        className
      )}
      style={{
        color: config.color,
        backgroundColor: config.background,
        borderColor: `${config.color}20`,
      }}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </div>
  );
}
