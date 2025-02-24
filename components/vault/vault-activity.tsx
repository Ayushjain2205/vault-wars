"use client";

import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownIcon, ArrowUpIcon, Settings2, Zap } from "lucide-react";
import type { VaultDetails } from "@/types/vault-details";

interface VaultActivityProps {
  vault: VaultDetails;
}

export function VaultActivity({ vault }: VaultActivityProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownIcon className="h-4 w-4 text-green-500" />;
      case "withdraw":
        return <ArrowUpIcon className="h-4 w-4 text-red-500" />;
      case "strategy":
        return <Settings2 className="h-4 w-4 text-[#04D9FF]" />;
      case "yield":
        return <Zap className="h-4 w-4 text-[#FFD119]" />;
      default:
        return null;
    }
  };

  const formatAmount = (amount?: number) => {
    if (!amount) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-[#0D0E19] border border-[#04D9FF]/20 rounded-lg p-4">
      <h2 className="font-nav text-sm uppercase text-[#04D9FF] mb-4">
        Recent Activity
      </h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-[#04D9FF]/10 hover:bg-transparent">
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vault.activity.map((activity) => (
              <TableRow
                key={activity.id}
                className="border-[#04D9FF]/10 hover:bg-transparent"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {getActivityIcon(activity.type)}
                    <span className="capitalize text-sm">{activity.type}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-400">
                  {activity.description}
                </TableCell>
                <TableCell className="text-sm">
                  {activity.amount ? (
                    <span
                      className={
                        activity.type === "withdraw"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {activity.type === "withdraw" ? "-" : "+"}
                      {formatAmount(activity.amount)}
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {activity.address ? (
                    <a
                      href="#"
                      className="font-mono text-xs text-[#04D9FF]/80 hover:text-[#04D9FF]"
                    >
                      {activity.address}
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="text-right text-sm text-gray-400">
                  {format(activity.timestamp, "MMM d, h:mm a")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
