import {
  Wallet,
  LineChart,
  MessageCircle,
  Brain,
  Shield,
  Repeat,
  Building,
  Zap,
  AlertTriangle,
  Coins,
  TrendingUp,
  BarChart2,
  Droplet,
  CircleDollarSign,
  Bell,
  Vote,
  Handshake,
  Bug,
} from "lucide-react";
import type {
  EventTypeConfig,
  ImpactConfig,
  EventCategory,
} from "@/types/events";

export const categoryIcons: Record<EventCategory, typeof Wallet> = {
  transfer: Wallet,
  swap: Repeat,
  deploy: Building,
  flash: Zap,
  liquidation: AlertTriangle,
  stake: Coins,
  wallet: Wallet,
  price: TrendingUp,
  volatility: BarChart2,
  volume: LineChart,
  liquidity: Droplet,
  listing: CircleDollarSign,
  order: Bell,
  social: MessageCircle,
  ai: Brain,
  governance: Vote,
  integration: Handshake,
  security: Bug,
};

export const eventTypes: EventTypeConfig[] = [
  {
    id: "onchain",
    label: "On-Chain Events",
    description: "Real-time blockchain transactions and contract interactions",
    color: "#04D9FF",
    icon: Wallet,
    categories: [
      "transfer",
      "swap",
      "deploy",
      "flash",
      "liquidation",
      "stake",
      "wallet",
    ],
  },
  {
    id: "market",
    label: "Market Data",
    description: "Price movements, trading volume, and market indicators",
    color: "#FF10F0",
    icon: LineChart,
    categories: [
      "price",
      "volatility",
      "volume",
      "liquidity",
      "listing",
      "order",
    ],
  },
  {
    id: "social",
    label: "Social Sentiment",
    description: "Community engagement and social media activity",
    color: "#FFD119",
    icon: MessageCircle,
    categories: ["social"],
  },
  {
    id: "ai",
    label: "AI Reactions",
    description: "AI-powered trading strategies and market analysis",
    color: "#9D4EDD",
    icon: Brain,
    categories: ["ai"],
  },
  {
    id: "protocol",
    label: "Protocol Events",
    description: "DeFi protocol updates and governance activities",
    color: "#00FF9D",
    icon: Shield,
    categories: ["governance", "integration", "security"],
  },
];

export const impactLevels: ImpactConfig[] = [
  {
    id: "high",
    label: "High Impact",
    color: {
      text: "text-red-500",
      background: "bg-red-500/10",
      border: "border-red-500/20",
      shadow: "shadow-[0_0_15px_rgba(239,68,68,0.15)]",
    },
  },
  {
    id: "medium",
    label: "Medium Impact",
    color: {
      text: "text-yellow-500",
      background: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      shadow: "shadow-[0_0_10px_rgba(234,179,8,0.1)]",
    },
  },
  {
    id: "low",
    label: "Low Impact",
    color: {
      text: "text-blue-500",
      background: "bg-blue-500/10",
      border: "border-blue-500/20",
      shadow: "shadow-[0_0_10px_rgba(59,130,246,0.1)]",
    },
  },
];

// Helper functions
export function getEventType(type: string): EventTypeConfig | undefined {
  return eventTypes.find((t) => t.id === type);
}

export function getImpactLevel(level: string): ImpactConfig | undefined {
  return impactLevels.find((l) => l.id === level);
}

export function getEventTypeColor(type: string): string {
  return getEventType(type)?.color || "#04D9FF";
}

export function getCategoryIcon(category: EventCategory) {
  return categoryIcons[category];
}
