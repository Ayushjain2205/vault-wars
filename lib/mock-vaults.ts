import type {
  VaultStats,
  RiskLevel,
  Strategy,
  BadgeType,
} from "@/types/leaderboard";

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

const strategies: Strategy[] = [
  "copy",
  "yield",
  "snipe",
  "arbitrage",
  "airdrop",
  "nft",
  "limit",
  "grid",
];

// Helper to generate a vault with random data
function generateVault(id: string, name: string): VaultStats {
  const baseYield = Math.random() * 60 - 20; // -20 to +40
  const weekYield = baseYield * (Math.random() * 0.3 + 0.85); // 85-115% of base yield
  const monthYield = baseYield * (Math.random() * 0.5 + 0.75); // 75-125% of base yield
  const tvl = Math.floor(Math.random() * 900000) + 100000; // 100k to 1M

  let riskLevel: RiskLevel = "balanced";
  if (Math.abs(weekYield - monthYield) > 15 || baseYield > 30) {
    riskLevel = "degen";
  } else if (Math.abs(weekYield - monthYield) < 5 && tvl > 400000) {
    riskLevel = "safe";
  }

  const badges: BadgeType[] = [];
  if (baseYield > 30) badges.push("top-gainer");
  if (tvl > 400000) badges.push("whale");
  if (Math.abs(weekYield - monthYield) < 5) badges.push("consistent");

  return {
    id,
    name,
    tvl,
    totalYield: baseYield,
    roi: {
      "7d": weekYield,
      "30d": monthYield,
    },
    performance: generatePerformance(
      100,
      riskLevel === "degen" ? 0.03 : riskLevel === "balanced" ? 0.02 : 0.01
    ),
    badges,
    riskLevel,
    strategy: strategies[Math.floor(Math.random() * strategies.length)],
  };
}

// Greek alphabet extended with cosmic names for more variety
const vaultPrefixes = [
  "Alpha",
  "Beta",
  "Gamma",
  "Delta",
  "Epsilon",
  "Zeta",
  "Eta",
  "Theta",
  "Iota",
  "Kappa",
  "Lambda",
  "Mu",
  "Nu",
  "Xi",
  "Omicron",
  "Pi",
  "Rho",
  "Sigma",
  "Tau",
  "Upsilon",
  "Phi",
  "Chi",
  "Psi",
  "Omega",
  "Nova",
  "Pulsar",
  "Quasar",
  "Nebula",
  "Stellar",
  "Cosmic",
  "Astro",
  "Solar",
  "Lunar",
  "Comet",
];

// Generate 34 vaults (showing pagination with 10 per page will give us 4 pages)
export const mockVaults: VaultStats[] = vaultPrefixes.map((prefix, index) =>
  generateVault(
    `${prefix.toLowerCase()}-${Math.floor(Math.random() * 1000)}`,
    `${prefix} Vault`
  )
);
