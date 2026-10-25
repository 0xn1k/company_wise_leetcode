"use client";

import { cn } from "@/lib/utils";
import type { Status } from "@/lib/types";

const OPTIONS: { key: Status | "ALL"; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "not_started", label: "Not started" },
  { key: "solved", label: "Completed" },
];

export function StatusFilter({
  value,
  onChange,
}: {
  value: Status | "ALL";
  onChange: (value: Status | "ALL") => void;
}) {
  return (
    <div className="inline-flex rounded-lg border p-0.5">
      {OPTIONS.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => onChange(opt.key)}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            value === opt.key
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
