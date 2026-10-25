export function formatAcceptance(rate: number): string {
  // Despite the column name, this value is not a true LeetCode acceptance
  // percentage (it ranges ~0.001-0.009 across the whole dataset, while real
  // acceptance rates run 20-80%) — it's a normalized per-company frequency
  // weight. Shown as-is (4 decimals), not scaled to "%", to avoid implying a
  // real acceptance percentage.
  return rate.toFixed(4);
}

export function formatFrequency(freq: number): string {
  return freq.toFixed(1);
}

// Math.round() alone turns any small-but-nonzero share (e.g. 2/813 = 0.25%)
// into a misleading "0%". Show "<1%" instead whenever progress exists but
// rounds to zero.
export function formatPercent(pct: number): string {
  if (pct <= 0) return "0%";
  if (pct < 1) return "<1%";
  return `${Math.round(pct)}%`;
}
