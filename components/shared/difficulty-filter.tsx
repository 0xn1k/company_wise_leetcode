"use client";

import { cn } from "@/lib/utils";
import type { Difficulty } from "@/lib/types";

const OPTIONS: { key: Difficulty | "ALL"; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "EASY", label: "Easy" },
  { key: "MEDIUM", label: "Medium" },
  { key: "HARD", label: "Hard" },
];

export function DifficultyFilter({
  value,
  onChange,
}: {
  value: Difficulty | "ALL";
  onChange: (value: Difficulty | "ALL") => void;
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
