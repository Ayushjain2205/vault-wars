"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowUpDown, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventCard } from "./event-card";
import { EventFilters } from "./event-filters";
import { mockEvents } from "@/lib/mock-events";
import type { EventType, ImpactLevel } from "@/types/events";

const timeframes = [
  { label: "Last Hour", value: "1h" },
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "All Time", value: "all" },
];

const sortOptions = [
  { label: "Most Recent", value: "recent" },
  { label: "Most Impactful", value: "impact" },
  { label: "Most Discussed", value: "social" },
];

export function ActivityFeed() {
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([
    "onchain",
    "market",
    "social",
    "ai",
    "protocol",
  ]);
  const [selectedImpact, setSelectedImpact] = useState<ImpactLevel[]>([
    "low",
    "medium",
    "high",
  ]);
  const [timeframe, setTimeframe] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [search, setSearch] = useState("");

  const toggleType = (type: EventType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleImpact = (impact: ImpactLevel) => {
    setSelectedImpact((prev) =>
      prev.includes(impact)
        ? prev.filter((i) => i !== impact)
        : [...prev, impact]
    );
  };

  const getTimeframeDate = (tf: string) => {
    const now = new Date();
    switch (tf) {
      case "1h":
        return new Date(now.getTime() - 60 * 60 * 1000);
      case "24h":
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case "7d":
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      default:
        return new Date(0);
    }
  };

  const filteredEvents = mockEvents
    .filter((event) => {
      const matchesType = selectedTypes.includes(event.type);
      const matchesImpact = selectedImpact.includes(event.impact);
      const matchesTimeframe = event.timestamp >= getTimeframeDate(timeframe);
      const matchesSearch =
        search === "" ||
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.token?.toLowerCase().includes(search.toLowerCase()) ||
        event.protocol?.toLowerCase().includes(search.toLowerCase()) ||
        event.exchange?.toLowerCase().includes(search.toLowerCase());

      return matchesType && matchesImpact && matchesTimeframe && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return b.timestamp.getTime() - a.timestamp.getTime();
        case "impact":
          return (
            { high: 3, medium: 2, low: 1 }[b.impact] -
            { high: 3, medium: 2, low: 1 }[a.impact]
          );
        case "social":
          return (b.socialEngagement || 0) - (a.socialEngagement || 0);
        default:
          return 0;
      }
    });

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      {/* Main Feed */}
      <div className="space-y-4">
        {/* Search and Sort Controls */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search events, tokens, protocols..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-[#0D0E19] border-[#04D9FF]/30 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px] bg-[#0D0E19] border-[#04D9FF]/30 text-white">
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map((tf) => (
                <SelectItem key={tf.value} value={tf.value}>
                  {tf.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-[#0D0E19] border-[#04D9FF]/30 text-white">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence>
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              formatTimestamp={formatTimestamp}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Filters */}
      <div className="space-y-6">
        <EventFilters
          selectedTypes={selectedTypes}
          selectedImpact={selectedImpact}
          onTypeToggle={toggleType}
          onImpactToggle={toggleImpact}
        />
      </div>
    </div>
  );
}
