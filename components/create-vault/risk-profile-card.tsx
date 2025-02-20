"use client";

import { Shield, Gauge, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface RiskProfileCardProps {
  type: "safe" | "balanced" | "degen";
  isSelected: boolean;
  onSelect: () => void;
}

export function RiskProfileCard({
  type,
  isSelected,
  onSelect,
}: RiskProfileCardProps) {
  const profiles = {
    safe: {
      icon: Shield,
      title: "Safe Mode",
      description: "Low volatility, stable returns, conservative AI decisions",
      color: "#04D9FF",
    },
    balanced: {
      icon: Gauge,
      title: "Balanced Mode",
      description: "Moderate risk-reward balance, AI dynamically shifts funds",
      color: "#9D4EDD",
    },
    degen: {
      icon: Flame,
      title: "Degen Mode",
      description:
        "High-risk, aggressive AI execution, potential for big gains",
      color: "#FF10F0",
    },
  };

  const profile = profiles[type];
  const Icon = profile.icon;

  return (
    <motion.div
      whileHover="hover"
      animate={isSelected ? "selected" : "default"}
      initial="default"
      onClick={onSelect}
      className={cn(
        "relative rounded-lg cursor-pointer overflow-hidden bg-[#0D0E19]",
        "border-2",
        type === "safe" && "text-[#04D9FF] border-[#04D9FF]",
        type === "balanced" && "text-[#9D4EDD] border-[#9D4EDD]",
        type === "degen" && "text-[#FF10F0] border-[#FF10F0]",
        isSelected && "shadow-[0_0_15px_rgba(var(--color),0.3)]",
        type === "safe" && "[--color:4,217,255]",
        type === "balanced" && "[--color:157,78,221]",
        type === "degen" && "[--color:255,16,240]"
      )}
    >
      {/* Grid Animation Effect */}
      <AnimatePresence>
        {(isSelected || false) && (
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
                  className="bg-current"
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
              className="bg-current"
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
        className="relative p-6"
        variants={{
          hover: { y: -5 },
          selected: { y: -5 },
          default: { y: 0 },
        }}
      >
        <div className="flex items-start gap-4">
          <motion.div
            className="rounded-full p-3 bg-current/10"
            variants={{
              hover: { scale: 1.1 },
              selected: { scale: 1.1 },
              default: { scale: 1 },
            }}
          >
            <Icon className="h-6 w-6 text-current" />
          </motion.div>
          <div className="flex-1">
            <motion.h3
              className="font-nav text-lg uppercase mb-2 text-current"
              variants={{
                hover: { letterSpacing: "0.05em" },
                selected: { letterSpacing: "0.05em" },
                default: { letterSpacing: "0" },
              }}
            >
              {profile.title}
            </motion.h3>
            <p className="text-gray-400 text-sm">{profile.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Selection Glow Effect */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.15, 0.1] }}
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
