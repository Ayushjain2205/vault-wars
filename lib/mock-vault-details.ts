import type { VaultDetails } from "@/types/vault-details";

// Helper to generate mock performance data
function generatePerformanceData(days: number, volatility: number, trend = 0) {
  const data = [];
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;
  let value = 100;

  for (let i = days; i >= 0; i--) {
    const change = (Math.random() - 0.5) * volatility + trend;
    value = value * (1 + change);
    data.push({
      timestamp: now - i * msPerDay,
      value,
    });
  }

  return data;
}

export const mockVaultDetails: VaultDetails = {
  id: "alpha-vault-01",
  name: "Alpha Vault",
  tvl: 1250000,
  totalYield: 28.5,
  roi: {
    "7d": 2.5,
    "30d": 8.7,
    "90d": 22.4,
    allTime: 45.2,
  },
  riskLevel: "medium",
  badges: ["top-gainer", "whale", "consistent"],
  isTracked: false,
  performance: {
    tvl: generatePerformanceData(90, 0.02, 0.003),
    yield: generatePerformanceData(90, 0.03, 0.002),
    roi: generatePerformanceData(90, 0.025, 0.001),
  },
  composition: {
    assets: [
      {
        asset: "Ethereum",
        symbol: "ETH",
        amount: 250.5,
        value: 500000,
        percentage: 40,
        riskScore: 6,
      },
      {
        asset: "USD Coin",
        symbol: "USDC",
        amount: 400000,
        value: 400000,
        percentage: 32,
        riskScore: 2,
      },
      {
        asset: "Lido Staked ETH",
        symbol: "stETH",
        amount: 175.25,
        value: 350000,
        percentage: 28,
        riskScore: 4,
      },
      {
        asset: "Bitcoin",
        symbol: "WBTC",
        amount: 175.25,
        value: 350000,
        percentage: 28,
        riskScore: 4,
      },
      {
        asset: "Dai Stablecoin",
        symbol: "DAI",
        amount: 175.25,
        value: 350000,
        percentage: 28,
        riskScore: 4,
      },
    ],
    yieldSources: [
      {
        name: "ETH-USDC LP",
        protocol: "Uniswap V3",
        apy: 15.5,
        allocation: 45,
        risk: "medium",
      },
      {
        name: "stETH Staking",
        protocol: "Lido",
        apy: 4.2,
        allocation: 30,
        risk: "low",
      },
      {
        name: "USDC Lending",
        protocol: "Aave",
        apy: 3.8,
        allocation: 25,
        risk: "low",
      },
    ],
  },
  activity: [
    {
      id: "tx-1",
      type: "deposit",
      timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
      amount: 50000,
      description: "New deposit",
      address: "0x1234...5678",
      txHash: "0xabcd...efgh",
    },
    {
      id: "tx-2",
      type: "strategy",
      timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
      description: "Rebalanced portfolio due to market volatility",
      txHash: "0xijkl...mnop",
    },
    {
      id: "tx-3",
      type: "yield",
      timestamp: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
      amount: 1250,
      description: "Claimed yield rewards",
      txHash: "0xqrst...uvwx",
    },
    {
      id: "tx-4",
      type: "withdraw",
      timestamp: Date.now() - 1000 * 60 * 60 * 24, // 24 hours ago
      amount: 25000,
      description: "Withdrawal processed",
      address: "0x9876...5432",
      txHash: "0xyzab...cdef",
    },
  ],
  strategy: {
    name: "Dynamic Yield Optimizer",
    description:
      "This vault employs a dynamic strategy that automatically balances between stable yields and higher-risk opportunities based on market conditions. It primarily focuses on major DeFi protocols with proven track records.",
    riskLevel: "medium",
    yieldSources: ["Liquidity Providing", "Staking", "Lending"],
    adjustments: [
      {
        type: "Risk Adjustment",
        description:
          "Automatically adjusts position sizes based on market volatility",
        trigger: "Market volatility exceeds threshold",
      },
      {
        type: "Yield Optimization",
        description:
          "Moves assets to highest yielding opportunities while respecting risk parameters",
        trigger: "Significant APY differential detected",
      },
      {
        type: "Protection Mechanism",
        description:
          "Increases stablecoin allocation during high market uncertainty",
        trigger: "Market risk indicators high",
      },
    ],
  },
};
