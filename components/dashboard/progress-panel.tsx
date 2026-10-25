"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/shared/progress-ring";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrackerStore } from "@/lib/store/tracker-store";
import { useQuestionsIndex } from "@/lib/data/use-questions-index";
import { useMounted } from "@/lib/utils/use-mounted";
import { computeOverallStats } from "@/lib/utils/compute-stats";
import { formatPercent } from "@/lib/utils/format";
import type { Difficulty } from "@/lib/types";

const DIFFICULTY_META: Record<Difficulty, { label: string; barClass: string; textClass: string }> = {
  EASY: { label: "Easy", barClass: "bg-emerald-500", textClass: "text-emerald-400" },
  MEDIUM: { label: "Medium", barClass: "bg-amber-500", textClass: "text-amber-400" },
  HARD: { label: "Hard", barClass: "bg-rose-500", textClass: "text-rose-400" },
};

function encouragement(solved: number): string {
  if (solved === 0) return "Solve your first question to get the ball rolling.";
  if (solved < 10) return "Building mastery one problem at a time — keep the momentum going!";
  if (solved < 50) return "Solid pace. The patterns are starting to click.";
  return "Serious progress. You're well on your way.";
}

export function ProgressPanel() {
  const mounted = useMounted();
  const statusMap = useTrackerStore((s) => s.statusMap);
  const { data: questionsIndex, loading } = useQuestionsIndex();

  if (!mounted || loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  const stats = computeOverallStats(statusMap, questionsIndex);

  return (
    <div className="space-y-4">
      <Card className="gap-3 border-primary/20 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
            <Rocket className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">Keep pushing!</p>
            <p className="text-xs text-muted-foreground">{encouragement(stats.solved)}</p>
          </div>
        </div>
      </Card>

      <Card className="gap-4 p-5">
        <div className="flex items-center gap-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <ProgressRing value={stats.solved} total={stats.total} size={72} stroke={7} />
          </motion.div>
          <div>
            <p className="text-sm font-semibold">Total progress</p>
            <p className="text-xs text-muted-foreground">
              {stats.solved} / {stats.total} unique questions
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          {(Object.keys(DIFFICULTY_META) as Difficulty[]).map((d) => {
            const meta = DIFFICULTY_META[d];
            const stat = stats.byDifficulty[d];
            const pct = stat.total > 0 ? (stat.solved / stat.total) * 100 : 0;
            return (
              <div key={d} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={meta.textClass}>{meta.label}</span>
                  <span className="text-muted-foreground">
                    {stat.solved}/{stat.total}{" "}
                    <span className="text-foreground">{formatPercent(pct)}</span>
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className={`h-full rounded-full ${meta.barClass}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
