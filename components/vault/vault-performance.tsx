"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import type { VaultDetails } from "@/types/vault-details";
import type { TimeFrame } from "@/types/vault-details";

interface VaultPerformanceProps {
  vault: VaultDetails;
}

export function VaultPerformance({ vault }: VaultPerformanceProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("30D");

  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp), "MMM d");
  };

  return (
    <div className="bg-[#0D0E19] border border-[#04D9FF]/20 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-nav text-sm uppercase text-[#04D9FF]">
          Performance
        </h2>
        <div className="flex gap-1">
          {(["7D", "30D", "90D", "ALL"] as TimeFrame[]).map((frame) => (
            <button
              key={frame}
              onClick={() => setTimeFrame(frame)}
              className={`px-2 py-1 text-xs font-medium rounded ${
                timeFrame === frame
                  ? "bg-[#04D9FF]/10 text-[#04D9FF]"
                  : "text-gray-400 hover:text-[#04D9FF] hover:bg-[#04D9FF]/5"
              }`}
            >
              {frame}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={vault.performance.roi}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="performanceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#04D9FF" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#04D9FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatDate}
              stroke="#4A5568"
              tick={{ fill: "#4A5568", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(value) => `${value.toFixed(0)}%`}
              stroke="#4A5568"
              tick={{ fill: "#4A5568", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#0D0E19] border border-[#04D9FF]/20 rounded-lg p-2 shadow-lg">
                      <div className="text-xs text-gray-400">
                        {formatDate(payload[0].payload.timestamp)}
                      </div>
                      <div className="text-sm font-medium text-[#04D9FF]">
                        {typeof payload[0].value === "number"
                          ? payload[0].value.toFixed(2)
                          : payload[0].value}
                        %
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#04D9FF"
              strokeWidth={2}
              fill="url(#performanceGradient)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
