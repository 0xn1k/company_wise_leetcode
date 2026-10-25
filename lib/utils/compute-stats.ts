import type { Difficulty, QuestionsIndex } from "@/lib/types";

export interface DifficultyStat {
  solved: number;
  total: number;
}

export interface OverallStats {
  solved: number;
  total: number;
  byDifficulty: Record<Difficulty, DifficultyStat>;
}

const EMPTY: OverallStats = {
  solved: 0,
  total: 0,
  byDifficulty: {
    EASY: { solved: 0, total: 0 },
    MEDIUM: { solved: 0, total: 0 },
    HARD: { solved: 0, total: 0 },
  },
};

// Dedupes by question slug (not by company occurrence): solving the same
// question under multiple companies counts once toward "problems mastered".
export function computeOverallStats(
  statusMap: Record<string, "solved">,
  questionsIndex: QuestionsIndex | null
): OverallStats {
  if (!questionsIndex) return EMPTY;

  const difficultyBySlug = new Map<string, Difficulty>();
  const totals: Record<Difficulty, number> = { EASY: 0, MEDIUM: 0, HARD: 0 };
  for (const q of questionsIndex.questions) {
    difficultyBySlug.set(q.l, q.d);
    totals[q.d]++;
  }

  const solvedSlugs = new Set<string>();
  for (const [key, status] of Object.entries(statusMap)) {
    if (status !== "solved") continue;
    const questionSlug = key.slice(key.indexOf(":") + 1);
    solvedSlugs.add(questionSlug);
  }

  const solvedByDifficulty: Record<Difficulty, number> = { EASY: 0, MEDIUM: 0, HARD: 0 };
  for (const slug of solvedSlugs) {
    const d = difficultyBySlug.get(slug);
    if (d) solvedByDifficulty[d]++;
  }

  return {
    solved: solvedSlugs.size,
    total: questionsIndex.questions.length,
    byDifficulty: {
      EASY: { solved: solvedByDifficulty.EASY, total: totals.EASY },
      MEDIUM: { solved: solvedByDifficulty.MEDIUM, total: totals.MEDIUM },
      HARD: { solved: solvedByDifficulty.HARD, total: totals.HARD },
    },
  };
}
