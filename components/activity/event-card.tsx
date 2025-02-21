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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "cyber-panel p-6 relative overflow-hidden group transition-all hover:bg-[#0D0E19]/80",
        `text-[${eventType.color}]`,
        "before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-30",
        `before:bg-[radial-gradient(circle_at_center,${eventType.color}_0%,transparent_100%)] before:blur-xl`,
        "after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-300 group-hover:after:opacity-15",
        `after:bg-[radial-gradient(circle_at_center,${eventType.color}_0%,transparent_70%)]`
      )}
    >
      <div className="relative flex items-start gap-4">
        <div
          className={cn(
            "rounded-full p-2 transition-colors duration-300",
            "group-hover:bg-current/10 bg-current/5",
            `text-[${eventType.color}]`
          )}
        >
          <Icon className={cn("h-5 w-5")} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn("font-nav text-sm uppercase")}>{event.title}</h3>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                impactLevel.color.background,
                impactLevel.color.text,
                impactLevel.color.border,
                impactLevel.color.shadow
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
