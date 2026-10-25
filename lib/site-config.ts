// Set NEXT_PUBLIC_SITE_URL once deployed (e.g. in Vercel project env vars)
// so metadata, the sitemap, and robots.txt all point at the real domain.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://company-wise-leetcode.vercel.app";
export const SITE_NAME = "Company-Wise LeetCode";
export const SITE_DESCRIPTION =
  "Track LeetCode interview prep across 470 companies — browse by company, filter by difficulty, bookmark questions, and track your solved progress.";
