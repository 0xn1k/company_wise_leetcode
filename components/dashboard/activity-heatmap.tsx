"use client";

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrackerStore } from "@/lib/store/tracker-store";
import { useMounted } from "@/lib/utils/use-mounted";
import { cn } from "@/lib/utils";

const DAY_MS = 24 * 60 * 60 * 1000;

function toKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function levelClass(count: number) {
  if (count === 0) return "bg-muted";
  if (count === 1) return "bg-emerald-300 dark:bg-emerald-800";
  if (count <= 3) return "bg-emerald-500 dark:bg-emerald-600";
  return "bg-emerald-700 dark:bg-emerald-400";
}

// Full current calendar year (Jan 1 - Dec 31), padded out to whole weeks
// (Sun-Sat) so every month — including ones still ahead, like Nov/Dec —
// renders as an empty column rather than being cut off at "today".
function buildWeeks(activityLog: Record<string, number>) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = today.getFullYear();

  const start = new Date(year, 0, 1);
  start.setDate(start.getDate() - start.getDay());

  const end = new Date(year, 11, 31);
  end.setDate(end.getDate() + (6 - end.getDay()));

  const totalDays = Math.round((end.getTime() - start.getTime()) / DAY_MS) + 1;

  const days: { date: Date; key: string; count: number; inYear: boolean }[] = [];
  for (let i = 0; i < totalDays; i++) {
    const date = new Date(start.getTime() + i * DAY_MS);
    const key = toKey(date);
    days.push({ date, key, count: activityLog[key] ?? 0, inYear: date.getFullYear() === year });
  }

  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return { weeks, today };
}

const MONTH_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short" });

// One label per week-column: the month name wherever a new month starts
// (based on that week's first in-year day), blank otherwise — same approach
// GitHub uses for its contribution graph.
function getMonthLabels(weeks: ReturnType<typeof buildWeeks>["weeks"]) {
  let lastMonth = -1;
  return weeks.map((week) => {
    const firstInYear = week.find((d) => d.inYear);
    if (!firstInYear) return null;
    const month = firstInYear.date.getMonth();
    if (month === lastMonth) return null;
    lastMonth = month;
    return MONTH_FORMAT.format(firstInYear.date);
  });
}

export function ActivityHeatmap() {
  const mounted = useMounted();
  const activityLog = useTrackerStore((s) => s.activityLog);

  // `new Date()` is non-deterministic and must not run during server
  // prerendering — only compute the calendar grid once mounted on the client.
  if (!mounted) {
    return <Skeleton className="h-[9.5rem] w-full max-w-md" />;
  }

  const { weeks, today } = buildWeeks(activityLog);
  const monthLabels = getMonthLabels(weeks);
  const totalSolved = Object.values(activityLog).reduce((sum, n) => sum + n, 0);

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <div className="flex gap-1">
          {monthLabels.map((label, i) => (
            <div key={i} className="w-3.5 shrink-0 text-[10px] text-muted-foreground">
              {label}
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1 pb-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) =>
                day.inYear ? (
                  <Tooltip key={day.key}>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: (wi * 7 + di) * 0.002 }}
                        className={cn(
                          "h-3.5 w-3.5 rounded-sm",
                          levelClass(day.count),
                          day.date.getTime() === today.getTime() && "ring-1 ring-primary"
                        )}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      {day.count} solved on {day.date.toLocaleDateString()}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div key={day.key} className="h-3.5 w-3.5" />
                )
              )}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        {totalSolved} question{totalSolved === 1 ? "" : "s"} solved total
      </p>
    </div>
  );
}
