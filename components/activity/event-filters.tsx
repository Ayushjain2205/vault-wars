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
  // Helper function to convert Tailwind color to hex
  const getColorFromTailwind = (colorClass: string) => {
    const colorMap: Record<string, string> = {
      "text-red-500": "#ef4444",
      "text-yellow-500": "#eab308",
      "text-blue-500": "#3b82f6",
    };
    return colorMap[colorClass] || "#9ca3af";
  };

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
          const isSelected = selectedTypes.includes(type.id);

          return (
            <button
              key={type.id}
              onClick={() => onTypeToggle(type.id)}
              style={{
                backgroundColor: isSelected ? `${type.color}1a` : "transparent",
                color: isSelected ? type.color : "#9ca3af",
              }}
              className={cn(
                "w-full p-2 rounded flex items-center gap-2 transition-colors hover:bg-opacity-5"
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
          {impactLevels.map((level) => {
            const isSelected = selectedImpact.includes(level.id);
            const color = getColorFromTailwind(level.color.text);

            return (
              <button
                key={level.id}
                onClick={() => onImpactToggle(level.id)}
                style={{
                  backgroundColor: isSelected ? `${color}1a` : "transparent",
                  color: isSelected ? color : "#9ca3af",
                }}
                className="w-full p-2 rounded flex items-center gap-2 transition-colors hover:bg-opacity-5"
              >
                <span className="font-nav text-sm">{level.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
