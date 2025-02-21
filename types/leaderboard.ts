export type TimeRange = "24h" | "7d" | "30d" | "all";
export type BadgeType = "top-gainer" | "whale" | "consistent";

export interface PerformancePoint {
  timestamp: number;
  value: number;
}

export interface VaultStats {
  id: string;
  name: string;
  tvl: number;
  totalYield: number;
  roi: {
    "7d": number;
    "30d": number;
  };
  performance: PerformancePoint[];
  badges: BadgeType[];
}

export interface LeaderboardFilters {
  timeRange: TimeRange;
  search: string;
}
