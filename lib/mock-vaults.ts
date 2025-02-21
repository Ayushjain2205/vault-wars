import type { VaultStats } from "@/types/leaderboard";

// Helper to generate mock performance data
function generatePerformance(
  baseValue: number,
  volatility: number,
  points = 30
) {
  const data = [];
  let currentValue = baseValue;
  const now = Date.now();
  const interval = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  for (let i = points - 1; i >= 0; i--) {
    const change = (Math.random() - 0.5) * volatility;
    currentValue = currentValue * (1 + change);
    data.push({
      timestamp: now - i * interval,
      value: currentValue,
    });
  }

  return data;
}

export const mockVaults: VaultStats[] = [
  {
    id: "alpha-1",
    name: "Alpha Vault",
    tvl: 500000,
    totalYield: 35,
    roi: {
      "7d": 4.2,
      "30d": 12.5,
    },
    performance: generatePerformance(100, 0.02),
    badges: ["top-gainer", "whale"],
  },
  {
    id: "beta-1",
    name: "Beta Vault",
    tvl: 350000,
    totalYield: -8,
    roi: {
      "7d": -2.8,
      "30d": -5.2,
    },
    performance: generatePerformance(100, 0.015),
    badges: ["consistent"],
  },
  {
    id: "gamma-1",
    name: "Gamma Vault",
    tvl: 220000,
    totalYield: 26,
    roi: {
      "7d": 2.9,
      "30d": 9.1,
    },
    performance: generatePerformance(100, 0.025),
    badges: ["top-gainer"],
  },
  {
    id: "delta-1",
    name: "Delta Vault",
    tvl: 180000,
    totalYield: -12,
    roi: {
      "7d": -3.5,
      "30d": -8.5,
    },
    performance: generatePerformance(100, 0.03),
    badges: [],
  },
  {
    id: "epsilon-1",
    name: "Epsilon Vault",
    tvl: 450000,
    totalYield: 32,
    roi: {
      "7d": 3.9,
      "30d": 11.8,
    },
    performance: generatePerformance(100, 0.018),
    badges: ["whale", "consistent"],
  },
  {
    id: "zeta-1",
    name: "Zeta Vault",
    tvl: 290000,
    totalYield: 15,
    roi: {
      "7d": 1.2,
      "30d": 4.8,
    },
    performance: generatePerformance(100, 0.01),
    badges: ["consistent"],
  },
  {
    id: "eta-1",
    name: "Eta Vault",
    tvl: 380000,
    totalYield: -5,
    roi: {
      "7d": -1.6,
      "30d": -2.8,
    },
    performance: generatePerformance(100, 0.022),
    badges: [],
  },
  {
    id: "theta-1",
    name: "Theta Vault",
    tvl: 420000,
    totalYield: 33,
    roi: {
      "7d": 4.0,
      "30d": 12.0,
    },
    performance: generatePerformance(100, 0.028),
    badges: ["top-gainer", "whale"],
  },
];
