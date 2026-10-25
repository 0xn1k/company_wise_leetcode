"use client";

import { useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ArrowUpDown } from "lucide-react";
import { DifficultyBadge } from "@/components/question/difficulty-badge";
import { TopicChips } from "@/components/question/topic-chips";
import { CompleteToggle } from "@/components/question/complete-toggle";
import { BookmarkToggle } from "@/components/question/bookmark-toggle";
import { formatFrequency } from "@/lib/utils/format";
import { questionLink, type Difficulty } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface QuestionTableRow {
  l: string;
  t: string;
  d: Difficulty;
  tp: string[];
  frequency?: number;
  acceptance?: number;
  companyNames?: string[];
}

type SortKey = "title" | "difficulty" | "frequency" | "companies";

const DIFFICULTY_RANK: Record<Difficulty, number> = { EASY: 0, MEDIUM: 1, HARD: 2 };

export function QuestionTable({
  mode,
  companySlug,
  rows,
}: {
  mode: "company" | "global";
  companySlug?: string;
  rows: QuestionTableRow[];
}) {
  const [sortKey, setSortKey] = useState<SortKey>("frequency");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "title":
          cmp = a.t.localeCompare(b.t);
          break;
        case "difficulty":
          cmp = DIFFICULTY_RANK[a.d] - DIFFICULTY_RANK[b.d];
          break;
        case "companies":
          cmp = (a.companyNames?.length ?? 0) - (b.companyNames?.length ?? 0);
          break;
        case "frequency":
        default:
          cmp = (a.frequency ?? 0) - (b.frequency ?? 0);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: sorted.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 12,
  });

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 border-b px-3 py-2 text-xs font-medium text-muted-foreground sm:gap-4">
        <SortHeader label="" width="w-14 sm:w-16" />
        <SortHeader label="Title" active={sortKey === "title"} dir={sortDir} onClick={() => toggleSort("title")} className="flex-1" />
        <SortHeader label="Difficulty" active={sortKey === "difficulty"} dir={sortDir} onClick={() => toggleSort("difficulty")} width="w-16 sm:w-24" />
        <SortHeader label="Topics" width="w-64 hidden lg:flex" />
        {mode === "company" ? (
          <SortHeader label="Frequency" active={sortKey === "frequency"} dir={sortDir} onClick={() => toggleSort("frequency")} width="hidden sm:flex w-24" />
        ) : (
          <SortHeader label="Companies" active={sortKey === "companies"} dir={sortDir} onClick={() => toggleSort("companies")} width="hidden sm:flex w-28" />
        )}
      </div>

      <div ref={parentRef} className="h-[70vh] overflow-auto">
        <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
          {virtualItems.map((item) => {
            const row = sorted[item.index];
            return (
              <div
                key={row.l}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: item.size,
                  transform: `translateY(${item.start}px)`,
                }}
                className="flex items-center gap-2 border-b px-3 text-sm hover:bg-muted/50 sm:gap-4"
              >
                <div className="flex w-14 shrink-0 items-center gap-1 sm:w-16">
                  {mode === "company" && companySlug && (
                    <CompleteToggle companySlug={companySlug} questionSlug={row.l} />
                  )}
                  <BookmarkToggle questionSlug={row.l} />
                </div>
                <a
                  href={questionLink(row.l)}
                  target="_blank"
                  rel="noreferrer"
                  className="min-w-0 flex-1 truncate font-medium hover:underline"
                >
                  {row.t}
                </a>
                <div className="w-16 shrink-0 sm:w-24">
                  <DifficultyBadge difficulty={row.d} />
                </div>
                <div className="hidden w-64 shrink-0 lg:flex">
                  <TopicChips topics={row.tp} max={2} />
                </div>
                {mode === "company" ? (
                  <div className="hidden w-24 shrink-0 text-muted-foreground sm:block">
                    {row.frequency !== undefined ? formatFrequency(row.frequency) : "—"}
                  </div>
                ) : (
                  <div className="hidden w-28 shrink-0 text-muted-foreground sm:block">
                    {row.companyNames?.length ?? 0} companies
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t px-3 py-2 text-xs text-muted-foreground">
        {sorted.length} question{sorted.length === 1 ? "" : "s"}
      </div>
    </div>
  );
}

function SortHeader({
  label,
  active,
  dir,
  onClick,
  width,
  className,
}: {
  label: string;
  active?: boolean;
  dir?: "asc" | "desc";
  onClick?: () => void;
  width?: string;
  className?: string;
}) {
  if (!onClick) {
    return <div className={cn(width, className)}>{label}</div>;
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 text-left transition-colors hover:text-foreground",
        active && "text-foreground",
        width,
        className
      )}
    >
      {label}
      <ArrowUpDown className={cn("h-3 w-3", active && dir === "asc" && "rotate-180")} />
    </button>
  );
}
