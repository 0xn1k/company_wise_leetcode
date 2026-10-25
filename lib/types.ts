export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type Status = "not_started" | "solved";

export interface QuestionRecord {
  l: string; // leetcode slug
  t: string; // title
  d: Difficulty;
  f: number; // frequency
  a: number; // acceptance rate
  tp: string[]; // topics
}

export type TimeframeKey =
  | "thirtyDays"
  | "threeMonths"
  | "sixMonths"
  | "moreThanSixMonths"
  | "all";

export const TIMEFRAMES: { key: TimeframeKey; label: string }[] = [
  { key: "thirtyDays", label: "Thirty Days" },
  { key: "threeMonths", label: "Three Months" },
  { key: "sixMonths", label: "Six Months" },
  { key: "moreThanSixMonths", label: "More Than Six Months" },
  { key: "all", label: "All" },
];

export interface CompanyDetail {
  name: string;
  slug: string;
  timeframes: Record<TimeframeKey, QuestionRecord[]>;
}

export interface CompanyIndexEntry {
  slug: string;
  name: string;
  counts: Record<TimeframeKey, number>;
  difficultyCounts: { all: Record<Difficulty, number> };
}

export interface GlobalQuestion {
  l: string;
  t: string;
  d: Difficulty;
  tp: string[];
  occ: [number, number][]; // [companyIndex, frequency][]
}

export interface QuestionsIndex {
  companies: string[];
  questions: GlobalQuestion[];
}

export function questionLink(slug: string): string {
  return `https://leetcode.com/problems/${slug}`;
}
