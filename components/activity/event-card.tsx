"use client";

import { motion } from "framer-motion";
import { Building, Coins, Hash, MessageCircle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/events";
import { getCategoryIcon, getEventType, getImpactLevel } from "@/config/events";

interface EventCardProps {
  event: Event;
  formatTimestamp: (date: Date) => string;
}

export function EventCard({ event, formatTimestamp }: EventCardProps) {
  const eventType = getEventType(event.type);
  const impactLevel = getImpactLevel(event.impact);
  const Icon = getCategoryIcon(event.category);

  if (!eventType || !impactLevel) return null;

  // Convert Tailwind color to hex
  const getColorFromTailwind = (colorClass: string) => {
    const colorMap: Record<string, string> = {
      "text-red-500": "#ef4444",
      "text-yellow-500": "#eab308",
      "text-blue-500": "#3b82f6",
    };
    return colorMap[colorClass] || "#9ca3af";
  };

  const impactColor = getColorFromTailwind(impactLevel.color.text);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={
        {
          color: eventType.color,
          "--event-color": eventType.color,
        } as React.CSSProperties
      }
      className={cn(
        "cyber-panel p-6 relative overflow-hidden group transition-all hover:bg-[#0D0E19]/80",
        "border border-transparent hover:border-current",
        "before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-30",
        "before:bg-[radial-gradient(circle_at_center,var(--event-color)_0%,transparent_100%)] before:blur-xl",
        "after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-300 group-hover:after:opacity-15",
        "after:bg-[radial-gradient(circle_at_center,var(--event-color)_0%,transparent_70%)]",
        "transition-[background,border-color,box-shadow]",
        "hover:shadow-[0_0_30px_rgba(var(--event-color-rgb),0.2)]"
      )}
    >
      <div className="relative flex items-start gap-4">
        <div
          style={
            {
              color: eventType.color,
              "--event-color-rgb": eventType.color
                .replace("#", "")
                .match(/.{2}/g)
                ?.map((x) => parseInt(x, 16))
                .join(","),
            } as React.CSSProperties
          }
          className={cn(
            "rounded-full p-2 transition-colors duration-300",
            "group-hover:bg-current/10 bg-current/5"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-nav text-sm uppercase">{event.title}</h3>
            <span
              style={
                {
                  "--impact-color": impactColor,
                  color: impactColor,
                  backgroundColor: `${impactColor}1a`,
                  borderColor: `${impactColor}33`,
                  boxShadow: `0 0 15px ${impactColor}26`,
                } as React.CSSProperties
              }
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                "relative overflow-hidden transition-all duration-300",
                "border",
                "before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-30",
                "before:bg-[radial-gradient(circle_at_center,var(--impact-color)_0%,transparent_100%)] before:blur-xl",
                "after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-15",
                "after:bg-[radial-gradient(circle_at_center,var(--impact-color)_0%,transparent_70%)]"
              )}
            >
              {event.impact}
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed my-2">
            {event.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <span className="text-xs text-gray-500">
              {formatTimestamp(event.timestamp)}
            </span>
            {event.token && (
              <span className="text-xs font-medium text-gray-400">
                <Hash className="inline-block h-3 w-3 mr-1" />
                {event.token}
              </span>
            )}
            {event.amount && (
              <span className="text-xs font-medium text-gray-400">
                <Coins className="inline-block h-3 w-3 mr-1" />
                {event.amount}
              </span>
            )}
            {event.protocol && (
              <span className="text-xs font-medium text-gray-400">
                <Shield className="inline-block h-3 w-3 mr-1" />
                {event.protocol}
              </span>
            )}
            {event.exchange && (
              <span className="text-xs font-medium text-gray-400">
                <Building className="inline-block h-3 w-3 mr-1" />
                {event.exchange}
              </span>
            )}
            {event.socialEngagement && (
              <span className="text-xs font-medium text-gray-400">
                <MessageCircle className="inline-block h-3 w-3 mr-1" />
                {event.socialEngagement.toLocaleString()} engagements
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
