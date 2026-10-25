"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Circle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTrackerStore } from "@/lib/store/tracker-store";
import { useMounted } from "@/lib/utils/use-mounted";

export function CompleteToggle({
  companySlug,
  questionSlug,
}: {
  companySlug: string;
  questionSlug: string;
}) {
  const mounted = useMounted();
  const status = useTrackerStore((s) => s.getStatus(companySlug, questionSlug));
  const toggleCompleted = useTrackerStore((s) => s.toggleCompleted);

  const solved = mounted && status === "solved";
  const label = solved ? "Completed" : "Mark as completed";

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={solved}
      onClick={() => toggleCompleted(companySlug, questionSlug)}
      className="relative inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-muted"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={solved ? "solved" : "not_started"}
          initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className={cn(
            "flex items-center justify-center",
            solved ? "text-emerald-500" : "text-muted-foreground"
          )}
        >
          {solved ? (
            <CheckCircle2 className="h-[18px] w-[18px]" />
          ) : (
            <Circle className="h-[18px] w-[18px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
