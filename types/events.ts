import type { LucideIcon } from "lucide-react";

export type EventType = "onchain" | "market" | "social" | "ai" | "protocol";
export type EventCategory =
  | "transfer"
  | "swap"
  | "deploy"
  | "flash"
  | "liquidation"
  | "stake"
  | "wallet"
  | "price"
  | "volatility"
  | "volume"
  | "liquidity"
  | "listing"
  | "order"
  | "social"
  | "ai"
  | "governance"
  | "integration"
  | "security";
export type ImpactLevel = "low" | "medium" | "high";

export interface EventTypeConfig {
  id: EventType;
  label: string;
  description: string;
  color: string;
  icon: LucideIcon;
  categories: EventCategory[];
}

export interface Event {
  id: string;
  type: EventType;
  category: EventCategory;
  title: string;
  description: string;
  impact: ImpactLevel;
  timestamp: Date;
  token?: string;
  amount?: string;
  exchange?: string;
  protocol?: string;
  socialEngagement?: number;
}

export interface ImpactConfig {
  id: ImpactLevel;
  label: string;
  color: {
    text: string;
    background: string;
    border: string;
    shadow: string;
  };
}
