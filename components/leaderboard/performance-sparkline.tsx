"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
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

  return (
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
  );
}
