"use client";

import { useEffect, useState } from "react";
import type { QuestionsIndex } from "@/lib/types";

let cache: QuestionsIndex | null = null;

export function useQuestionsIndex(): { data: QuestionsIndex | null; loading: boolean } {
  const [data, setData] = useState<QuestionsIndex | null>(() => cache);
  const [loading, setLoading] = useState(() => !cache);

  useEffect(() => {
    if (cache) return;
    fetch("/data/questions-index.json")
      .then((res) => res.json())
      .then((json: QuestionsIndex) => {
        cache = json;
        setData(json);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
