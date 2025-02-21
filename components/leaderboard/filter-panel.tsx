"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  SlidersHorizontal,
  ArrowUpDown,
  Trophy,
  Shield,
  Boxes,
  X,
  Gauge,
  Flame,
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
import type {
  LeaderboardFilters,
  TimeRange,
  BadgeType,
  RiskLevel,
  Strategy,
  SortField,
  DateRange,
} from "@/types/leaderboard";

interface FilterPanelProps {
  filters: LeaderboardFilters;
  onFiltersChange: (filters: LeaderboardFilters) => void;
  onReset: () => void;
}

const timeRanges = [
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "All Time", value: "all" },
  { label: "Custom", value: "custom" },
] as const;

const sortFields = [
  { label: "TVL", value: "tvl" },
  { label: "30D ROI", value: "roi" },
  { label: "Total Yield", value: "yield" },
] as const;

const badges = [
  { label: "Whale Vaults", value: "whale" },
  { label: "Top Gainers", value: "top-gainer" },
  { label: "Consistent", value: "consistent" },
] as const;

const riskLevels = [
  { label: "Safe", value: "safe", color: "#04D9FF", icon: Shield },
  { label: "Balanced", value: "balanced", color: "#9D4EDD", icon: Gauge },
  { label: "Degen", value: "degen", color: "#FF10F0", icon: Flame },
] as const;

const strategies = [
  { label: "Copy Trading", value: "copy", color: "#04D9FF", icon: Users },
  { label: "Yield Farming", value: "yield", color: "#9D4EDD", icon: Sprout },
  { label: "Token Sniping", value: "snipe", color: "#FF10F0", icon: Rocket },
  {
    label: "Arbitrage Trading",
    value: "arbitrage",
    color: "#FFD119",
    icon: RefreshCw,
  },
  { label: "Airdrop Farming", value: "airdrop", color: "#04D9FF", icon: Gift },
  { label: "NFT Flipping", value: "nft", color: "#9D4EDD", icon: ImageIcon },
  { label: "AI Limit Orders", value: "limit", color: "#FF10F0", icon: Target },
  { label: "Grid Trading", value: "grid", color: "#FFD119", icon: Grid },
] as const;

export function FilterPanel({
  filters,
  onFiltersChange,
  onReset,
}: FilterPanelProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleBadge = (badge: BadgeType) => {
    const newBadges = filters.badges.includes(badge)
      ? filters.badges.filter((b) => b !== badge)
      : [...filters.badges, badge];
    onFiltersChange({ ...filters, badges: newBadges, page: 1 });
  };

  const toggleRiskLevel = (risk: RiskLevel) => {
    const newRiskLevels = filters.riskLevels.includes(risk)
      ? filters.riskLevels.filter((r) => r !== risk)
      : [...filters.riskLevels, risk];
    onFiltersChange({ ...filters, riskLevels: newRiskLevels, page: 1 });
  };

  const toggleStrategy = (strategy: Strategy) => {
    const newStrategies = filters.strategies.includes(strategy)
      ? filters.strategies.filter((s) => s !== strategy)
      : [...filters.strategies, strategy];
    onFiltersChange({ ...filters, strategies: newStrategies, page: 1 });
  };

  const handleTimeRangeChange = (value: TimeRange) => {
    if (value === "custom") {
      setIsCalendarOpen(true);
    }
    onFiltersChange({
      ...filters,
      timeRange: value,
      page: 1,
      dateRange:
        value !== "custom"
          ? { from: undefined, to: undefined }
          : filters.dateRange,
    });
  };

  const handleDateRangeChange = (dateRange: DateRange) => {
    onFiltersChange({
      ...filters,
      dateRange,
      page: 1,
    });
  };

  const toggleSortDirection = () => {
    onFiltersChange({
      ...filters,
      sort: {
        ...filters.sort,
        direction: filters.sort.direction === "asc" ? "desc" : "asc",
      },
      page: 1,
    });
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4">
        {/* Time Range */}
        <Select value={filters.timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-[180px] bg-[#0D0E19] border-[#04D9FF]/30 text-white">
            <CalendarIcon className="mr-2 h-4 w-4" />
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

        {/* Custom Date Range Picker */}
        {filters.timeRange === "custom" && (
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal bg-[#0D0E19] border-[#04D9FF]/30 text-white",
                  !filters.dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateRange?.from ? (
                  filters.dateRange.to ? (
                    <>
                      {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                      {format(filters.dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(filters.dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={filters.dateRange?.from}
                selected={{
                  from: filters.dateRange?.from,
                  to: filters.dateRange?.to,
                }}
                onSelect={(range) =>
                  handleDateRangeChange(
                    range || { from: undefined, to: undefined }
                  )
                }
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        )}

        {/* Sort Controls */}
        <Select
          value={filters.sort.field}
          onValueChange={(value: SortField) =>
            onFiltersChange({
              ...filters,
              sort: { ...filters.sort, field: value },
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-[180px] bg-[#0D0E19] border-[#04D9FF]/30 text-white">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortFields.map((field) => (
              <SelectItem key={field.value} value={field.value}>
                {field.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleSortDirection}
          className="bg-[#0D0E19] border-[#04D9FF]/30 text-[#04D9FF] hover:bg-[#04D9FF]/10"
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-10 bg-[#04D9FF]/30" />

        {/* Filter Popover Groups */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "bg-[#0D0E19] border-[#04D9FF]/30 text-white",
                filters.badges.length > 0 && "bg-[#04D9FF]/10 border-[#04D9FF]"
              )}
            >
              <Trophy className="mr-2 h-4 w-4" />
              Badges
              {filters.badges.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-[#04D9FF] text-[#0D0E19]"
                >
                  {filters.badges.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] bg-[#0D0E19] border-[#04D9FF]/30">
            <div className="space-y-2">
              {badges.map((badge) => (
                <Button
                  key={badge.value}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    filters.badges.includes(badge.value as BadgeType)
                      ? "bg-[#04D9FF]/10 text-[#04D9FF]"
                      : "text-white hover:bg-[#04D9FF]/5 hover:text-[#04D9FF]"
                  )}
                  onClick={() => toggleBadge(badge.value as BadgeType)}
                >
                  {badge.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "bg-[#0D0E19] border-[#FF10F0]/30 text-white",
                filters.riskLevels.length > 0 &&
                  "bg-[#FF10F0]/10 border-[#FF10F0]"
              )}
            >
              <Shield className="mr-2 h-4 w-4" />
              Risk Level
              {filters.riskLevels.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-[#FF10F0] text-[#0D0E19]"
                >
                  {filters.riskLevels.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] bg-[#0D0E19] border-[#FF10F0]/30">
            <div className="space-y-2">
              {riskLevels.map((risk) => {
                const Icon = risk.icon;
                return (
                  <Button
                    key={risk.value}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2",
                      filters.riskLevels.includes(risk.value as RiskLevel)
                        ? `bg-[${risk.color}]/10 text-[${risk.color}]`
                        : `text-white hover:bg-[${risk.color}]/5 hover:text-[${risk.color}]`
                    )}
                    onClick={() => toggleRiskLevel(risk.value as RiskLevel)}
                  >
                    <Icon className="h-4 w-4" />
                    {risk.label}
                  </Button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "bg-[#0D0E19] border-[#9D4EDD]/30 text-white",
                filters.strategies.length > 0 &&
                  "bg-[#9D4EDD]/10 border-[#9D4EDD]"
              )}
            >
              <Boxes className="mr-2 h-4 w-4" />
              Strategies
              {filters.strategies.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-[#9D4EDD] text-[#0D0E19]"
                >
                  {filters.strategies.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] bg-[#0D0E19] border-[#9D4EDD]/30">
            <div className="space-y-2">
              {strategies.map((strategy) => {
                const Icon = strategy.icon;
                return (
                  <Button
                    key={strategy.value}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2",
                      filters.strategies.includes(strategy.value as Strategy)
                        ? `bg-[${strategy.color}]/10 text-[${strategy.color}]`
                        : `text-white hover:bg-[${strategy.color}]/5 hover:text-[${strategy.color}]`
                    )}
                    onClick={() => toggleStrategy(strategy.value as Strategy)}
                  >
                    <Icon className="h-4 w-4" />
                    {strategy.label}
                  </Button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
