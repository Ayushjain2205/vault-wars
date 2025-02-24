export interface VaultDetails {
  id: string;
  name: string;
  tvl: number;
  totalYield: number;
  roi: {
    "7d": number;
    "30d": number;
    "90d": number;
    allTime: number;
  };
  riskLevel: "low" | "medium" | "high";
  badges: string[];
  isTracked: boolean;
  performance: {
    tvl: PerformanceDataPoint[];
    yield: PerformanceDataPoint[];
    roi: PerformanceDataPoint[];
  };
  composition: {
    assets: AssetAllocation[];
    yieldSources: YieldSource[];
  };
  activity: VaultActivity[];
  strategy: VaultStrategy;
}

export interface PerformanceDataPoint {
  timestamp: number;
  value: number;
}

export interface AssetAllocation {
  asset: string;
  symbol: string;
  amount: number;
  value: number;
  percentage: number;
  riskScore: number;
}

export interface YieldSource {
  name: string;
  protocol: string;
  apy: number;
  allocation: number;
  risk: "low" | "medium" | "high";
}

export interface VaultActivity {
  id: string;
  type: "deposit" | "withdraw" | "yield" | "strategy";
  timestamp: number;
  amount?: number;
  description: string;
  address?: string;
  txHash?: string;
}

export interface VaultStrategy {
  name: string;
  description: string;
  riskLevel: "low" | "medium" | "high";
  yieldSources: string[];
  adjustments: {
    type: string;
    description: string;
    trigger: string;
  }[];
}

export type TimeFrame = "7D" | "30D" | "90D" | "ALL";
export type RiskLevel = "low" | "medium" | "high";
export type Badge = "top-gainer" | "whale" | "consistent";

export interface ROIData {
  "7d": number;
  "30d": number;
  "90d": number;
  allTime: number;
}

export interface VaultStats {
  id: string;
  name: string;
  tvl: number;
  totalYield: number;
  roi: ROIData;
  riskLevel: RiskLevel;
  badges: Badge[];
  isTracked: boolean;
  lastUpdated: Date;
}
