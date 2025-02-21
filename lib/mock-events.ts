import type { Event } from "@/types/events";

export const mockEvents: Event[] = [
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
