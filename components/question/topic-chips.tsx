"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function TopicChips({ topics, max = 3 }: { topics: string[]; max?: number }) {
  const [expanded, setExpanded] = useState(false);
  if (topics.length === 0) return null;

  const visible = expanded ? topics : topics.slice(0, max);
  const hidden = topics.length - visible.length;

  return (
    <div className="flex flex-wrap items-center gap-1">
      {visible.map((topic) => (
        <Badge key={topic} variant="outline" className="text-xs font-normal">
          {topic}
        </Badge>
      ))}
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
        >
          +{hidden} more
        </button>
      )}
    </div>
  );
}
