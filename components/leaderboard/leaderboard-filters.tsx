"use client";

import { Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TimeRange, LeaderboardFilters } from "@/types/leaderboard";

interface LeaderboardFiltersProps {
  filters: LeaderboardFilters;
  onFiltersChange: (filters: LeaderboardFilters) => void;
}

const timeRanges: { label: string; value: TimeRange }[] = [
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "All Time", value: "all" },
];

export function LeaderboardFilters({
  filters,
  onFiltersChange,
}: LeaderboardFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search vaults..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="pl-9 bg-[#0D0E19] border-[#04D9FF]/30 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      <Select
        value={filters.timeRange}
        onValueChange={(value: TimeRange) =>
          onFiltersChange({ ...filters, timeRange: value })
        }
      >
        <SelectTrigger className="w-[180px] bg-[#0D0E19] border-[#04D9FF]/30 text-white">
          <Clock className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Select timeframe" />
        </SelectTrigger>
        <SelectContent>
          {timeRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
