import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "standby" | "terminated" | "warning";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        status === "active" &&
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        status === "standby" &&
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        status === "terminated" &&
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        status === "warning" &&
          "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        className
      )}
    >
      <span className="relative flex h-2 w-2 mr-1.5">
        <span
          className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            status === "active" && "bg-green-400",
            status === "standby" && "bg-yellow-400",
            status === "terminated" && "bg-red-400",
            status === "warning" && "bg-orange-400"
          )}
        />
        <span
          className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            status === "active" && "bg-green-500",
            status === "standby" && "bg-yellow-500",
            status === "terminated" && "bg-red-500",
            status === "warning" && "bg-orange-500"
          )}
        />
      </span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
}
