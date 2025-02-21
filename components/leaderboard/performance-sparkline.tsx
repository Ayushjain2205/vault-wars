"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import type { PerformancePoint } from "@/types/leaderboard";

interface PerformanceSparklineProps {
  data: PerformancePoint[];
  height?: number;
}

export function PerformanceSparkline({
  data,
  height = 40,
}: PerformanceSparklineProps) {
  const isPositive = data[data.length - 1].value >= data[0].value;
  const color = isPositive ? "#22c55e" : "#ef4444";
  const percentageChange =
    ((data[data.length - 1].value - data[0].value) / data[0].value) * 100;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div style={{ width: "160px", height: `${height}px` }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient
                    id={`gradient-${isPositive ? "up" : "down"}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  fill={`url(#gradient-${isPositive ? "up" : "down"})`}
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#0D0E19] border border-[#04D9FF]/30 shadow-[0_0_10px_rgba(4,217,255,0.1)]">
          <div className="space-y-1">
            <div className="text-xs text-gray-400">
              {format(data[0].timestamp, "MMM d")} -{" "}
              {format(data[data.length - 1].timestamp, "MMM d")}
            </div>
            <div className="font-medium" style={{ color }}>
              {percentageChange >= 0 ? "+" : ""}
              {percentageChange.toFixed(2)}%
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
