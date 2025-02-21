export type TimeRange = "24h" | "7d" | "30d" | "all" | "custom";
export type BadgeType = "top-gainer" | "whale" | "consistent";
export type RiskLevel = "safe" | "balanced" | "degen";
export type Strategy =
  | "copy"
  | "yield"
  | "snipe"
  | "arbitrage"
  | "airdrop"
  | "nft"
  | "limit"
  | "grid";
export type SortField = "tvl" | "roi" | "yield";
export type SortDirection = "asc" | "desc";

export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

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
  riskLevel: RiskLevel;
  strategy: Strategy;
}

export interface LeaderboardFilters {
  timeRange: TimeRange;
  dateRange: DateRange;
  search: string;
  page: number;
  pageSize: number;
  sort: {
    field: SortField;
    direction: SortDirection;
  };
  badges: BadgeType[];
  riskLevels: RiskLevel[];
  strategies: Strategy[];
}
