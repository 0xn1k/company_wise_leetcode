"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTrackerStore } from "@/lib/store/tracker-store";
import { useMounted } from "@/lib/utils/use-mounted";

export function BookmarkToggle({ questionSlug }: { questionSlug: string }) {
  const mounted = useMounted();
  const bookmarked = useTrackerStore((s) => s.isBookmarked(questionSlug));
  const toggleBookmark = useTrackerStore((s) => s.toggleBookmark);

  const active = mounted && bookmarked;

  return (
    <motion.button
      type="button"
      aria-label={active ? "Remove bookmark" : "Add bookmark"}
      onClick={() => toggleBookmark(questionSlug)}
      whileTap={{ scale: 0.8 }}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-muted"
    >
      <motion.span
        animate={active ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <Star
          className={cn(
            "h-[18px] w-[18px] transition-colors",
            active ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
          )}
        />
      </motion.span>
    </motion.button>
  );
}
