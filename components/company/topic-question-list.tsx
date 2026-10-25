"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { DifficultyBadge } from "@/components/question/difficulty-badge";
import { CompleteToggle } from "@/components/question/complete-toggle";
import { BookmarkToggle } from "@/components/question/bookmark-toggle";
import { useTrackerStore } from "@/lib/store/tracker-store";
import { useMounted } from "@/lib/utils/use-mounted";
import { questionLink, type QuestionRecord } from "@/lib/types";

interface TopicGroup {
  topic: string;
  questions: QuestionRecord[];
}

function groupByTopic(records: QuestionRecord[]): TopicGroup[] {
  const map = new Map<string, QuestionRecord[]>();
  for (const r of records) {
    const topic = r.tp[0] ?? "Other";
    if (!map.has(topic)) map.set(topic, []);
    map.get(topic)!.push(r);
  }
  const groups = Array.from(map.entries()).map(([topic, questions]) => ({
    topic,
    questions: [...questions].sort((a, b) => b.f - a.f),
  }));
  groups.sort((a, b) => b.questions.length - a.questions.length || a.topic.localeCompare(b.topic));
  return groups;
}

export function TopicQuestionList({
  companySlug,
  records,
}: {
  companySlug: string;
  records: QuestionRecord[];
}) {
  const groups = useMemo(() => groupByTopic(records), [records]);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(groups[0] ? [groups[0].topic] : []));

  const mounted = useMounted();
  const statusMap = useTrackerStore((s) => s.statusMap);

  function toggle(topic: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  }

  if (groups.length === 0) {
    return <p className="py-12 text-center text-sm text-muted-foreground">No questions match the current filters.</p>;
  }

  return (
    <div className="divide-y divide-border overflow-hidden rounded-xl border">
      {groups.map((group) => {
        const isOpen = expanded.has(group.topic);
        const solved = mounted
          ? group.questions.filter(
              (q) => statusMap[`${companySlug}:${q.l}`] === "solved"
            ).length
          : 0;

        return (
          <div key={group.topic}>
            <button
              type="button"
              onClick={() => toggle(group.topic)}
              className="flex w-full items-center gap-3 bg-card px-4 py-3 text-left transition-colors hover:bg-muted/40"
            >
              <motion.span animate={{ rotate: isOpen ? 0 : -90 }} transition={{ duration: 0.15 }}>
                <ChevronDown className="h-4 w-4 text-primary" />
              </motion.span>
              <span className="flex-1 text-sm font-semibold">{group.topic}</span>
              <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                {solved}/{group.questions.length}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {group.questions.map((q, i) => (
                    <div
                      key={q.l}
                      className="flex items-center gap-3 border-t px-4 py-2.5 text-sm hover:bg-muted/20"
                    >
                      <CompleteToggle companySlug={companySlug} questionSlug={q.l} />
                      <span className="w-5 shrink-0 text-xs text-muted-foreground">{i + 1}</span>
                      <a
                        href={questionLink(q.l)}
                        target="_blank"
                        rel="noreferrer"
                        className="min-w-0 flex-1 truncate font-medium hover:text-primary hover:underline"
                      >
                        {q.t}
                      </a>
                      <DifficultyBadge difficulty={q.d} />
                      <BookmarkToggle questionSlug={q.l} />
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
