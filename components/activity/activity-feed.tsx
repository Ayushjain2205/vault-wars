"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Zap,
  Droplet,
  AlertTriangle,
  TrendingUp,
  BarChart2,
  LineChart,
  CircleDollarSign,
  Bell,
  MessageCircle,
  Brain,
  Filter,
  Clock,
  ArrowUpDown,
  Hash,
  Building,
  Shield,
  Repeat,
  Coins,
  Vote,
  Handshake,
  Bug,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Event {
  id: string;
  type: "onchain" | "market" | "social" | "ai" | "protocol";
  category:
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
  title: string;
  description: string;
  impact: "low" | "medium" | "high";
  timestamp: Date;
  token?: string;
  amount?: string;
  exchange?: string;
  protocol?: string;
  socialEngagement?: number;
}

const mockEvents: Event[] = [
  // On-Chain Events
  {
    id: "1",
    type: "onchain",
    category: "transfer",
    title: "Large Token Transfer",
    description: "Whale moved 1M USDT to Binance",
    impact: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 mins ago
    token: "USDT",
    amount: "1,000,000",
    exchange: "Binance",
  },
  {
    id: "2",
    type: "onchain",
    category: "swap",
    title: "Large DEX Swap",
    description: "100K SOL swapped for USDC on Uniswap",
    impact: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    token: "SOL",
    amount: "100,000",
    exchange: "Uniswap",
    protocol: "Uniswap",
  },
  {
    id: "3",
    type: "onchain",
    category: "deploy",
    title: "New Protocol Deployment",
    description: "New lending protocol launched on Base",
    impact: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 mins ago
    protocol: "Base Lending",
  },

  // Market Data
  {
    id: "4",
    type: "market",
    category: "price",
    title: "Sudden Price Spike",
    description: "BTC +5% in 10 minutes",
    impact: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    token: "BTC",
    socialEngagement: 850,
  },
  {
    id: "5",
    type: "market",
    category: "liquidity",
    title: "Liquidity Pool Change",
    description: "WBTC/ETH pool lost 20% liquidity",
    impact: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 mins ago
    token: "WBTC",
    protocol: "Uniswap",
    socialEngagement: 320,
  },

  // Social Sentiment
  {
    id: "6",
    type: "social",
    category: "social",
    title: "Influencer Activity",
    description: "Elon Musk tweeted about DOGE",
    impact: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 mins ago
    token: "DOGE",
    socialEngagement: 1500,
  },

  // AI Reactions
  {
    id: "7",
    type: "ai",
    category: "ai",
    title: "AI Strategy Adjustment",
    description: "Vault #420 reallocated funds after liquidity drop",
    impact: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    protocol: "Vault Wars",
  },

  // Protocol Events
  {
    id: "8",
    type: "protocol",
    category: "governance",
    title: "DAO Proposal",
    description: "Aave proposal to change borrowing rates",
    impact: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 35), // 35 mins ago
    protocol: "Aave",
    socialEngagement: 450,
  },
  {
    id: "9",
    type: "onchain",
    category: "stake",
    title: "Small Stake Action",
    description: "User staked 0.5 ETH in Lido",
    impact: "low",
    timestamp: new Date(Date.now() - 1000 * 60 * 40), // 40 mins ago
    token: "ETH",
    amount: "0.5",
    protocol: "Lido",
  },
  {
    id: "10",
    type: "market",
    category: "volume",
    title: "Volume Update",
    description: "Trading volume slightly below average",
    impact: "low",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
    token: "LINK",
    socialEngagement: 120,
  },
];

const categoryIcons = {
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

const impactColors = {
  low: "bg-blue-500/10 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.1)] border border-blue-500/20",
  medium:
    "bg-yellow-500/10 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.1)] border border-yellow-500/20",
  high: "bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)] border border-red-500/20",
};

const typeColors = {
  onchain: "text-[#04D9FF]",
  market: "text-[#FF10F0]",
  social: "text-[#FFD119]",
  ai: "text-[#9D4EDD]",
  protocol: "text-[#00FF9D]",
};

const timeframes = [
  { label: "Last Hour", value: "1h" },
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "All Time", value: "all" },
];

const sortOptions = [
  { label: "Most Recent", value: "recent" },
  { label: "Most Impactful", value: "impact" },
  { label: "Most Discussed", value: "social" },
];

export function ActivityFeed() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "onchain",
    "market",
    "social",
    "ai",
    "protocol",
  ]);
  const [selectedImpact, setSelectedImpact] = useState<string[]>([
    "low",
    "medium",
    "high",
  ]);
  const [timeframe, setTimeframe] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [search, setSearch] = useState("");

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleImpact = (impact: string) => {
    setSelectedImpact((prev) =>
      prev.includes(impact)
        ? prev.filter((i) => i !== impact)
        : [...prev, impact]
    );
  };

  const getTimeframeDate = (tf: string) => {
    const now = new Date();
    switch (tf) {
      case "1h":
        return new Date(now.getTime() - 60 * 60 * 1000);
      case "24h":
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case "7d":
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      default:
        return new Date(0);
    }
  };

  const filteredEvents = mockEvents
    .filter((event) => {
      const matchesType = selectedTypes.includes(event.type);
      const matchesImpact = selectedImpact.includes(event.impact);
      const matchesTimeframe = event.timestamp >= getTimeframeDate(timeframe);
      const matchesSearch =
        search === "" ||
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.token?.toLowerCase().includes(search.toLowerCase()) ||
        event.protocol?.toLowerCase().includes(search.toLowerCase()) ||
        event.exchange?.toLowerCase().includes(search.toLowerCase());

      return matchesType && matchesImpact && matchesTimeframe && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return b.timestamp.getTime() - a.timestamp.getTime();
        case "impact":
          return (
            { high: 3, medium: 2, low: 1 }[b.impact] -
            { high: 3, medium: 2, low: 1 }[a.impact]
          );
        case "social":
          return (b.socialEngagement || 0) - (a.socialEngagement || 0);
        default:
          return 0;
      }
    });

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      {/* Main Feed */}
      <div className="space-y-4">
        {/* Search and Sort Controls */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search events, tokens, protocols..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-[#0D0E19] border-[#04D9FF]/30 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px] bg-[#0D0E19] border-[#04D9FF]/30 text-white">
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map((tf) => (
                <SelectItem key={tf.value} value={tf.value}>
                  {tf.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-[#0D0E19] border-[#04D9FF]/30 text-white">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence>
          {filteredEvents.map((event) => {
            const Icon = categoryIcons[event.category];
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "cyber-panel p-6 relative overflow-hidden group transition-all hover:bg-[#0D0E19]/80",
                  typeColors[event.type],
                  "before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-30",
                  event.type === "onchain" &&
                    "before:bg-[radial-gradient(circle_at_center,#04D9FF_0%,transparent_100%)] before:blur-xl",
                  event.type === "market" &&
                    "before:bg-[radial-gradient(circle_at_center,#FF10F0_0%,transparent_100%)] before:blur-xl",
                  event.type === "social" &&
                    "before:bg-[radial-gradient(circle_at_center,#FFD119_0%,transparent_100%)] before:blur-xl",
                  event.type === "protocol" &&
                    "before:bg-[radial-gradient(circle_at_center,#00FF9D_0%,transparent_100%)] before:blur-xl",
                  event.type === "ai" &&
                    "before:bg-[radial-gradient(circle_at_center,#9D4EDD_0%,transparent_100%)] before:blur-xl",
                  "after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-300 group-hover:after:opacity-15",
                  event.type === "onchain" &&
                    "after:bg-[radial-gradient(circle_at_center,#04D9FF_0%,transparent_70%)]",
                  event.type === "market" &&
                    "after:bg-[radial-gradient(circle_at_center,#FF10F0_0%,transparent_70%)]",
                  event.type === "social" &&
                    "after:bg-[radial-gradient(circle_at_center,#FFD119_0%,transparent_70%)]",
                  event.type === "protocol" &&
                    "after:bg-[radial-gradient(circle_at_center,#00FF9D_0%,transparent_70%)]",
                  event.type === "ai" &&
                    "after:bg-[radial-gradient(circle_at_center,#9D4EDD_0%,transparent_70%)]"
                )}
              >
                <div className="relative flex items-start gap-4">
                  <div
                    className={cn(
                      "rounded-full p-2 transition-colors duration-300",
                      "group-hover:bg-current/10 bg-current/5",
                      typeColors[event.type]
                    )}
                  >
                    <Icon className={cn("h-5 w-5", typeColors[event.type])} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={cn(
                          "font-nav text-sm uppercase",
                          typeColors[event.type]
                        )}
                      >
                        {event.title}
                      </h3>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          impactColors[event.impact]
                        )}
                      >
                        {event.impact}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed my-2">
                      {event.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(event.timestamp)}
                      </span>
                      {event.token && (
                        <span className="text-xs font-medium text-gray-400">
                          <Hash className="inline-block h-3 w-3 mr-1" />
                          {event.token}
                        </span>
                      )}
                      {event.amount && (
                        <span className="text-xs font-medium text-gray-400">
                          <Coins className="inline-block h-3 w-3 mr-1" />
                          {event.amount}
                        </span>
                      )}
                      {event.protocol && (
                        <span className="text-xs font-medium text-gray-400">
                          <Shield className="inline-block h-3 w-3 mr-1" />
                          {event.protocol}
                        </span>
                      )}
                      {event.exchange && (
                        <span className="text-xs font-medium text-gray-400">
                          <Building className="inline-block h-3 w-3 mr-1" />
                          {event.exchange}
                        </span>
                      )}
                      {event.socialEngagement && (
                        <span className="text-xs font-medium text-gray-400">
                          <MessageCircle className="inline-block h-3 w-3 mr-1" />
                          {event.socialEngagement.toLocaleString()} engagements
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Filters */}
      <div className="space-y-6">
        <div className="cyber-panel p-4 sticky top-24">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-[#04D9FF]" />
            <h3 className="font-nav text-sm uppercase text-[#04D9FF]">
              Event Types
            </h3>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => toggleType("onchain")}
              className={cn(
                "w-full p-2 rounded flex items-center gap-2 transition-colors",
                selectedTypes.includes("onchain")
                  ? "bg-[#04D9FF]/10 text-[#04D9FF]"
                  : "text-gray-400 hover:bg-[#04D9FF]/5"
              )}
            >
              <Wallet className="h-4 w-4" />
              <span className="font-nav text-sm">On-Chain Events</span>
            </button>
            <button
              onClick={() => toggleType("market")}
              className={cn(
                "w-full p-2 rounded flex items-center gap-2 transition-colors",
                selectedTypes.includes("market")
                  ? "bg-[#FF10F0]/10 text-[#FF10F0]"
                  : "text-gray-400 hover:bg-[#FF10F0]/5"
              )}
            >
              <LineChart className="h-4 w-4" />
              <span className="font-nav text-sm">Market Data</span>
            </button>
            <button
              onClick={() => toggleType("social")}
              className={cn(
                "w-full p-2 rounded flex items-center gap-2 transition-colors",
                selectedTypes.includes("social")
                  ? "bg-[#FFD119]/10 text-[#FFD119]"
                  : "text-gray-400 hover:bg-[#FFD119]/5"
              )}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="font-nav text-sm">Social Sentiment</span>
            </button>
            <button
              onClick={() => toggleType("ai")}
              className={cn(
                "w-full p-2 rounded flex items-center gap-2 transition-colors",
                selectedTypes.includes("ai")
                  ? "bg-[#9D4EDD]/10 text-[#9D4EDD]"
                  : "text-gray-400 hover:bg-[#9D4EDD]/5"
              )}
            >
              <Brain className="h-4 w-4" />
              <span className="font-nav text-sm">AI Reactions</span>
            </button>
            <button
              onClick={() => toggleType("protocol")}
              className={cn(
                "w-full p-2 rounded flex items-center gap-2 transition-colors",
                selectedTypes.includes("protocol")
                  ? "bg-[#00FF9D]/10 text-[#00FF9D]"
                  : "text-gray-400 hover:bg-[#00FF9D]/5"
              )}
            >
              <Shield className="h-4 w-4" />
              <span className="font-nav text-sm">Protocol Events</span>
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="h-4 w-4 text-[#04D9FF]" />
              <h3 className="font-nav text-sm uppercase text-[#04D9FF]">
                Impact Level
              </h3>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => toggleImpact("high")}
                className={cn(
                  "w-full p-2 rounded flex items-center gap-2 transition-colors",
                  selectedImpact.includes("high")
                    ? "bg-red-500/10 text-red-500"
                    : "text-gray-400 hover:bg-red-500/5"
                )}
              >
                <span className="font-nav text-sm">High Impact</span>
              </button>
              <button
                onClick={() => toggleImpact("medium")}
                className={cn(
                  "w-full p-2 rounded flex items-center gap-2 transition-colors",
                  selectedImpact.includes("medium")
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "text-gray-400 hover:bg-yellow-500/5"
                )}
              >
                <span className="font-nav text-sm">Medium Impact</span>
              </button>
              <button
                onClick={() => toggleImpact("low")}
                className={cn(
                  "w-full p-2 rounded flex items-center gap-2 transition-colors",
                  selectedImpact.includes("low")
                    ? "bg-blue-500/10 text-blue-500"
                    : "text-gray-400 hover:bg-blue-500/5"
                )}
              >
                <span className="font-nav text-sm">Low Impact</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
