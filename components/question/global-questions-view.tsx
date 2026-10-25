"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DifficultyFilter } from "@/components/shared/difficulty-filter";
import { QuestionTable } from "@/components/question/question-table";
import { useQuestionsIndex } from "@/lib/data/use-questions-index";
import type { Difficulty } from "@/lib/types";

export function GlobalQuestionsView() {
  const { data, loading } = useQuestionsIndex();
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "ALL">("ALL");

  const rows = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    return data.questions
      .filter((item) => (difficulty === "ALL" ? true : item.d === difficulty))
      .filter((item) => (q ? item.t.toLowerCase().includes(q) : true))
      .map((item) => ({
        l: item.l,
        t: item.t,
        d: item.d,
        tp: item.tp,
        companyNames: item.occ.map(([idx]) => data.companies[idx]),
      }));
  }, [data, query, difficulty]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading global question index...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions..."
          className="max-w-sm"
        />
        <DifficultyFilter value={difficulty} onChange={setDifficulty} />
      </div>
      <div className="rounded-lg border">
        <QuestionTable mode="global" rows={rows} />
      </div>
    </div>
  );
}
