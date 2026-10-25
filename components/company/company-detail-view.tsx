"use client";

import { useMemo, useState } from "react";
import { TimeframeTabs } from "@/components/company/timeframe-tabs";
import { DifficultyFilter } from "@/components/shared/difficulty-filter";
import { StatusFilter } from "@/components/shared/status-filter";
import { TopicQuestionList } from "@/components/company/topic-question-list";
import { useTrackerStore } from "@/lib/store/tracker-store";
import { useMounted } from "@/lib/utils/use-mounted";
import type { CompanyDetail, Difficulty, Status, TimeframeKey } from "@/lib/types";

export function CompanyDetailView({ company }: { company: CompanyDetail }) {
  const [timeframe, setTimeframe] = useState<TimeframeKey>("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "ALL">("ALL");
  const [status, setStatus] = useState<Status | "ALL">("ALL");

  const mounted = useMounted();
  const statusMap = useTrackerStore((s) => s.statusMap);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(company.timeframes).map(([k, v]) => [k, v.length])
      ) as Record<TimeframeKey, number>,
    [company.timeframes]
  );

  const rows = useMemo(() => {
    const records = company.timeframes[timeframe];
    return records.filter((r) => {
      if (difficulty !== "ALL" && r.d !== difficulty) return false;
      if (status !== "ALL" && mounted) {
        const key = `${company.slug}:${r.l}`;
        const current = statusMap[key] ?? "not_started";
        if (current !== status) return false;
      }
      return true;
    });
  }, [company.timeframes, timeframe, difficulty, status, statusMap, mounted, company.slug]);

  return (
    <div className="space-y-4">
      <TimeframeTabs active={timeframe} onChange={setTimeframe} counts={counts} />
      <div className="flex flex-wrap items-center gap-3">
        <DifficultyFilter value={difficulty} onChange={setDifficulty} />
        <StatusFilter value={status} onChange={setStatus} />
      </div>
      <TopicQuestionList companySlug={company.slug} records={rows} />
    </div>
  );
}
