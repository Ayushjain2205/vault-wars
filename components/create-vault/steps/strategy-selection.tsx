"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Sprout,
  Rocket,
  RefreshCw,
  Gift,
  ImageIcon,
  Target,
  Grid,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Strategy {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  metrics: {
    risk: number;
    potential: number;
    complexity: number;
  };
  color: string;
}

const strategies: Strategy[] = [
  {
    id: "copy",
    name: "Copy Trading",
    description: "AI mimics top traders' on-chain activity in real-time",
    icon: Users,
    metrics: {
      risk: 3,
      potential: 4,
      complexity: 2,
    },
    color: "#04D9FF",
  },
  {
    id: "yield",
    name: "Yield Farming",
    description: "AI moves funds between high APY DeFi protocols",
    icon: Sprout,
    metrics: {
      risk: 3,
      potential: 4,
      complexity: 3,
    },
    color: "#9D4EDD",
  },
  {
    id: "snipe",
    name: "Token Sniping",
    description: "AI detects new token launches and buys early",
    icon: Rocket,
    metrics: {
      risk: 5,
      potential: 5,
      complexity: 4,
    },
    color: "#FF10F0",
  },
  {
    id: "arbitrage",
    name: "Arbitrage Trading",
    description: "AI exploits price differences across DEXs and CEXs",
    icon: RefreshCw,
    metrics: {
      risk: 2,
      potential: 3,
      complexity: 4,
    },
    color: "#FFD119",
  },
  {
    id: "airdrop",
    name: "Airdrop Farming",
    description: "AI interacts with protocols for airdrop rewards",
    icon: Gift,
    metrics: {
      risk: 1,
      potential: 4,
      complexity: 2,
    },
    color: "#04D9FF",
  },
  {
    id: "nft",
    name: "NFT Flipping",
    description: "AI tracks NFT market trends and flips assets",
    icon: ImageIcon,
    metrics: {
      risk: 4,
      potential: 5,
      complexity: 3,
    },
    color: "#9D4EDD",
  },
  {
    id: "limit",
    name: "AI Limit Orders",
    description: "AI executes orders at target prices",
    icon: Target,
    metrics: {
      risk: 2,
      potential: 3,
      complexity: 2,
    },
    color: "#FF10F0",
  },
  {
    id: "grid",
    name: "Grid Trading",
    description: "AI places automated trades at multiple price levels",
    icon: Grid,
    metrics: {
      risk: 3,
      potential: 4,
      complexity: 4,
    },
    color: "#FFD119",
  },
];

interface StrategyCardProps {
  strategy: Strategy;
  isSelected: boolean;
  onSelect: () => void;
}

function StrategyCard({ strategy, isSelected, onSelect }: StrategyCardProps) {
  const Icon = strategy.icon;

  return (
    <motion.div
      whileHover="hover"
      animate={isSelected ? "selected" : "default"}
      initial="default"
      onClick={onSelect}
      className={cn(
        "relative rounded-lg cursor-pointer overflow-hidden bg-[#0D0E19]",
        "border",
        isSelected ? "border-2 border-[#04D9FF]" : "border-[#04D9FF]/10",
        isSelected && "shadow-[0_0_20px_rgba(var(--color),0.5)]"
      )}
      style={
        {
          borderColor: strategy.color,
          "--color": strategy.color
            .replace("#", "")
            .match(/.{2}/g)
            ?.map((x) => Number.parseInt(x, 16))
            .join(","),
        } as React.CSSProperties
      }
    >
      {/* Grid Animation Effect */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-[1px] opacity-20">
              {Array.from({ length: 64 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-current text-current"
                  style={{ color: strategy.color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: Math.random() }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Grid Animation Effect */}
      <motion.div
        variants={{
          hover: { opacity: 1 },
          selected: { opacity: 0 },
          default: { opacity: 0 },
        }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-[1px] opacity-20">
          {Array.from({ length: 64 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-current text-current"
              style={{ color: strategy.color }}
              variants={{
                hover: { opacity: Math.random() },
                selected: { opacity: 0 },
                default: { opacity: 0 },
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative p-4"
        variants={{
          hover: { y: -2 },
          selected: { y: -2 },
          default: { y: 0 },
        }}
      >
        <div className="flex items-start gap-3">
          <motion.div
            className="rounded-full p-2 bg-current/10"
            variants={{
              hover: { scale: 1.1 },
              selected: { scale: 1.1 },
              default: { scale: 1 },
            }}
          >
            <Icon
              className="h-5 w-5 text-current"
              style={{ color: strategy.color }}
            />
          </motion.div>
          <div className="flex-1">
            <motion.h3
              className="font-nav text-sm uppercase mb-1 text-current"
              style={{ color: strategy.color }}
              variants={{
                hover: { letterSpacing: "0.05em" },
                selected: { letterSpacing: "0.05em" },
                default: { letterSpacing: "0" },
              }}
            >
              {strategy.name}
            </motion.h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">
              {strategy.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              {Object.entries(strategy.metrics).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="font-nav uppercase text-gray-500">{key}</div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-1 w-3 rounded-full transition-colors"
                        style={{
                          backgroundColor:
                            i < value ? strategy.color : `${strategy.color}20`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selection Glow Effect */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            style={{
              background: `radial-gradient(circle at center, currentColor 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface StrategySelectionProps {
  selectedStrategy: string | null;
  onStrategySelect: (strategy: string) => void;
}

export function StrategySelection({
  selectedStrategy,
  onStrategySelect,
}: StrategySelectionProps) {
  // Remove this line:
  // const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {strategies.map((strategy) => (
        <StrategyCard
          key={strategy.id}
          strategy={strategy}
          isSelected={selectedStrategy === strategy.id}
          onSelect={() => onStrategySelect(strategy.id)}
        />
      ))}
    </div>
  );
}
