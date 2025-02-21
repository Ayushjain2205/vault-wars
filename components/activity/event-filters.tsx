"use client";

import { BarChart2, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { eventTypes, impactLevels } from "@/config/events";
import type { EventType, ImpactLevel } from "@/types/events";

interface EventFiltersProps {
  selectedTypes: EventType[];
  selectedImpact: ImpactLevel[];
  onTypeToggle: (type: EventType) => void;
  onImpactToggle: (impact: ImpactLevel) => void;
}

export function EventFilters({
  selectedTypes,
  selectedImpact,
  onTypeToggle,
  onImpactToggle,
}: EventFiltersProps) {
  return (
    <div className="cyber-panel p-4 sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4 text-[#04D9FF]" />
        <h3 className="font-nav text-sm uppercase text-[#04D9FF]">
          Event Types
        </h3>
      </div>
      <div className="space-y-2">
        {eventTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => onTypeToggle(type.id)}
              className={cn(
                "w-full p-2 rounded flex items-center gap-2 transition-colors",
                selectedTypes.includes(type.id)
                  ? `bg-[${type.color}]/10 text-[${type.color}]`
                  : `text-gray-400 hover:bg-[${type.color}]/5`
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="font-nav text-sm">{type.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="h-4 w-4 text-[#04D9FF]" />
          <h3 className="font-nav text-sm uppercase text-[#04D9FF]">
            Impact Level
          </h3>
        </div>
        <div className="space-y-2">
          {impactLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => onImpactToggle(level.id)}
              className={cn(
                "w-full p-2 rounded flex items-center gap-2 transition-colors",
                selectedImpact.includes(level.id)
                  ? cn(level.color.background, level.color.text)
                  : cn("text-gray-400", `hover:${level.color.background}`)
              )}
            >
              <span className="font-nav text-sm">{level.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
