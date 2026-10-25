"use client";

import { useMemo } from "react";
import { Bookmark, Loader2 } from "lucide-react";
import { QuestionTable } from "@/components/question/question-table";
import { EmptyState } from "@/components/shared/empty-state";
import { useQuestionsIndex } from "@/lib/data/use-questions-index";
import { useTrackerStore } from "@/lib/store/tracker-store";
import { useMounted } from "@/lib/utils/use-mounted";

export function BookmarksView() {
  const mounted = useMounted();
  const { data, loading } = useQuestionsIndex();
  const bookmarks = useTrackerStore((s) => s.bookmarks);

  const rows = useMemo(() => {
    if (!data || !mounted) return [];
    const slugs = Object.keys(bookmarks);
    return data.questions
      .filter((q) => slugs.includes(q.l))
      .map((q) => ({
        l: q.l,
        t: q.t,
        d: q.d,
        tp: q.tp,
        companyNames: q.occ.map(([idx]) => data.companies[idx]),
      }));
  }, [data, bookmarks, mounted]);

  if (loading || !mounted) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading bookmarks...
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="No bookmarks yet"
        description="Star a question from any company page or the global question list to save it here."
      />
    );
  }

  return (
    <div className="rounded-lg border">
      <QuestionTable mode="global" rows={rows} />
    </div>
  );
}
