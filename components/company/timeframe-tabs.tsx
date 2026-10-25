"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TIMEFRAMES, type TimeframeKey } from "@/lib/types";

export function TimeframeTabs({
  active,
  onChange,
  counts,
}: {
  active: TimeframeKey;
  onChange: (key: TimeframeKey) => void;
  counts: Record<TimeframeKey, number>;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b">
      {TIMEFRAMES.map(({ key, label }) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={cn(
              "relative shrink-0 whitespace-nowrap px-2.5 py-2 text-sm font-medium transition-colors sm:px-3",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
            <span className="ml-1.5 text-xs text-muted-foreground">({counts[key]})</span>
            {isActive && (
              <motion.div
                layoutId="timeframe-underline"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
