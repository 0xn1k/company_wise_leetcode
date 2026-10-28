"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Layers, ListChecks } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap";
import { ProgressPanel } from "@/components/dashboard/progress-panel";
import { PreparingForList } from "@/components/prep/preparing-for-list";
import { CompanyPickerDialog } from "@/components/prep/company-picker-dialog";
import { FeaturedLogos } from "@/components/shared/featured-logos";
import { useCompaniesIndex } from "@/lib/data/use-companies-index";
import { useQuestionsIndex } from "@/lib/data/use-questions-index";
import { useMounted } from "@/lib/utils/use-mounted";

export function DashboardView() {
  const mounted = useMounted();
  const companies = useCompaniesIndex();
  const { data: questionsIndex } = useQuestionsIndex();

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0 space-y-8">
        <div className="relative overflow-hidden rounded-2xl border bg-card p-5 sm:p-8">
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative space-y-4"
          >
            <p className="text-sm font-medium text-primary">LeetCode Tracker</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Prep by company,
              <br />
              <span className="text-primary">not by chance.</span>
            </h1>
            <p className="max-w-lg text-sm text-muted-foreground">
              Every company&rsquo;s most-asked questions, tracked individually —
              know exactly where you stand before the interview.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <StatChip
                icon={Building2}
                label="companies"
                value={mounted && companies.length ? companies.length : "…"}
              />
              <StatChip
                icon={Layers}
                label="unique questions"
                value={mounted && questionsIndex ? questionsIndex.questions.length.toLocaleString() : "…"}
              />
              <StatChip icon={ListChecks} label="timeframes each" value={5} />
            </div>
          </motion.div>
        </div>

        <FeaturedLogos />

        <Card className="p-5">
          <h2 className="mb-3 text-sm font-medium">Activity</h2>
          <ActivityHeatmap />
        </Card>

        <div className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-medium">Preparing for</h2>
              <p className="text-xs text-muted-foreground">
                Companies you&rsquo;re actively targeting, with focused progress.
              </p>
            </div>
            <CompanyPickerDialog companies={companies} />
          </div>
          <PreparingForList companies={companies} />
        </div>
      </div>

      <div className="space-y-4">
        <ProgressPanel />
        <Card className="gap-2 p-4">
          <Link href="/companies" className="text-sm font-medium hover:text-primary">
            Browse all companies →
          </Link>
          <Link href="/questions" className="text-sm font-medium hover:text-primary">
            Explore global questions →
          </Link>
          <Link href="/bookmarks" className="text-sm font-medium hover:text-primary">
            View bookmarks →
          </Link>
        </Card>
      </div>
    </div>
  );
}

function StatChip({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border bg-background/60 px-3 py-1.5 text-xs">
      <Icon className="h-3.5 w-3.5 text-primary" />
      <span className="font-semibold">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
