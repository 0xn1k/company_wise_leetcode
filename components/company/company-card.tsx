"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/shared/progress-ring";
import { CompanyLogo } from "@/components/company/company-logo";
import { useTrackerStore } from "@/lib/store/tracker-store";
import { useMounted } from "@/lib/utils/use-mounted";
import type { CompanyIndexEntry } from "@/lib/types";

export function CompanyCard({
  company,
  showProgress = false,
}: {
  company: CompanyIndexEntry;
  showProgress?: boolean;
}) {
  const mounted = useMounted();
  const statusMap = useTrackerStore((s) => s.statusMap);

  const total = company.counts.all;
  const solved = mounted
    ? Object.keys(statusMap).filter(
        (key) => key.startsWith(`${company.slug}:`) && statusMap[key] === "solved"
      ).length
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
    >
      <Link href={`/companies/${company.slug}`}>
        <Card className="flex flex-row items-center gap-3 p-4 transition-colors hover:border-primary/50">
          <CompanyLogo name={company.name} size={36} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{company.name}</p>
            <p className="text-xs text-muted-foreground">{total} questions</p>
          </div>
          {showProgress && <ProgressRing value={solved} total={total} size={40} stroke={4} />}
        </Card>
      </Link>
    </motion.div>
  );
}
