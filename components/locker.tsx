"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { generateColorScheme } from "@/utils/color-hash";

interface LockerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  onStateChange?: (isOpen: boolean) => void;
  seed: string;
}

export function Locker({
  size = "md",
  className = "",
  onStateChange,
  seed,
}: LockerProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
  };

  const colors = generateColorScheme(seed);

  const handleClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    setTimeout(() => {
      setIsOpen((prev) => !prev);
      onStateChange?.(!isOpen);
      setIsSpinning(false);
    }, 1000);
  };

  return (
    <div className={`relative aspect-square ${sizeClasses[size]} ${className}`}>
      {/* Main locker frame */}
      <div
        className="absolute inset-0 rounded-2xl shadow-lg overflow-hidden"
        style={{ backgroundColor: colors.frame }}
      >
        {/* Locker interior */}
        <div
          className="absolute inset-[10%] rounded-xl shadow-inner"
          style={{ backgroundColor: colors.interior }}
        >
          <div className="absolute inset-4 grid grid-cols-2 gap-2">
            <div
              className="rounded"
              style={{ backgroundColor: `${colors.compartment}33` }}
            />
            <div
              className="rounded"
              style={{ backgroundColor: `${colors.compartment}33` }}
            />
            <div
              className="rounded"
              style={{ backgroundColor: `${colors.compartment}33` }}
            />
            <div
              className="rounded"
              style={{ backgroundColor: `${colors.compartment}33` }}
            />
          </div>
        </div>

        {/* Locker door */}
        <motion.div
          className="absolute inset-[10%] rounded-xl shadow-lg cursor-pointer"
          style={{ backgroundColor: colors.door }}
          animate={{
            y: isOpen ? "-95%" : "0%",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: isOpen ? 0 : 0.2,
          }}
          onClick={handleClick}
        >
          {/* Corner squares */}
          <motion.div
            className="absolute left-[5%] top-[5%] h-[22%] w-[22%]"
            animate={{ opacity: isOpen ? 0.5 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="h-full w-full rounded-lg"
              style={{ backgroundColor: colors.accent }}
            />
          </motion.div>
          <motion.div
            className="absolute right-[5%] top-[5%] h-[22%] w-[22%]"
            animate={{ opacity: isOpen ? 0.5 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="h-full w-full rounded-lg"
              style={{ backgroundColor: colors.accent }}
            />
          </motion.div>
          <motion.div
            className="absolute bottom-[5%] left-[5%] h-[22%] w-[22%]"
            animate={{ opacity: isOpen ? 0.5 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="h-full w-full rounded-lg"
              style={{ backgroundColor: colors.accent }}
            />
          </motion.div>
          <motion.div
            className="absolute bottom-[5%] right-[5%] h-[22%] w-[22%]"
            animate={{ opacity: isOpen ? 0.5 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="h-full w-full rounded-lg"
              style={{ backgroundColor: colors.accent }}
            />
          </motion.div>

          <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Central mechanism */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ transformOrigin: "center center" }}
              animate={{
                rotate: isSpinning ? 360 : 0,
                scale: isOpen ? 0.9 : 1,
              }}
              transition={{
                rotate: {
                  duration: 1,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 0.3,
                },
              }}
            >
              {/* White background circle */}
              <motion.div
                className="absolute inset-0 rounded-full shadow-inner"
                style={{ backgroundColor: "#F5F5F5" }}
                animate={{
                  backgroundColor: isOpen ? "#E8E8E8" : "#F5F5F5",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Cross handles */}
              <motion.div
                className="absolute left-1/2 top-1/2 h-[85%] w-[15%] -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: colors.handle }}
                animate={{
                  backgroundColor: isOpen ? colors.handle : colors.handle,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[15%] w-[85%] -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: colors.handle }}
                animate={{
                  backgroundColor: isOpen ? colors.handle : colors.handle,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Center green circle */}
              <div className="absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="h-full w-full rounded-full shadow-md"
                  style={{ backgroundColor: colors.accent }}
                  animate={{
                    backgroundColor: isOpen ? colors.accent : colors.accent,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute left-[15%] top-[15%] h-[30%] w-[30%] rounded-full bg-white opacity-50" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
