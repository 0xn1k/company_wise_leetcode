"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/shared/progress-ring";
import { CompanyLogo } from "@/components/company/company-logo";
import { EmptyState } from "@/components/shared/empty-state";
import { Target } from "lucide-react";
import { useTrackerStore } from "@/lib/store/tracker-store";
import { useMounted } from "@/lib/utils/use-mounted";
import type { CompanyIndexEntry } from "@/lib/types";
import type { ReactNode } from "react";

export function PreparingForList({
  companies,
  emptyAction,
}: {
  companies: CompanyIndexEntry[];
  emptyAction?: ReactNode;
}) {
  const mounted = useMounted();
  const preparingFor = useTrackerStore((s) => s.preparingFor);
  const removePreparingFor = useTrackerStore((s) => s.removePreparingFor);
  const statusMap = useTrackerStore((s) => s.statusMap);

  const byslug = new Map(companies.map((c) => [c.slug, c]));
  const list = mounted ? preparingFor : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon={Target}
        title="No companies yet"
        description="Add companies you're preparing for to track focused progress."
        action={emptyAction}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {list.map((slug) => {
          const company = byslug.get(slug);
          if (!company) return null;
          const solved = Object.keys(statusMap).filter(
            (key) => key.startsWith(`${slug}:`) && statusMap[key] === "solved"
          ).length;

          return (
            <motion.div
              key={slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="flex items-center gap-3 p-4">
                <ProgressRing value={solved} total={company.counts.all} size={48} stroke={5} />
                <CompanyLogo name={company.name} size={28} />
                <div className="min-w-0 flex-1">
                  <Link href={`/companies/${slug}`} className="truncate text-sm font-medium hover:underline">
                    {company.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {solved} / {company.counts.all} solved
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => removePreparingFor(slug)}
                  aria-label="Remove"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
