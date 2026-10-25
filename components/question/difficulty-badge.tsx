import { cn } from "@/lib/utils";
import type { Difficulty } from "@/lib/types";

const STYLES: Record<Difficulty, string> = {
  EASY: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  MEDIUM: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  HARD: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
};

const LABELS: Record<Difficulty, string> = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        STYLES[difficulty]
      )}
    >
      {LABELS[difficulty]}
    </span>
  );
}
