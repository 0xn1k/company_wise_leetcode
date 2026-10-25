// One-off data pipeline: parses the 470 company CSV folders from the source
// data repo (github.com/liquidslr/leetcode-company-wise-problems, checked
// out separately on disk — this repo does not contain the raw CSVs) into
// compact JSON consumed by the Next.js app. Run manually with
// `npm run build:data` whenever the source CSVs change (not part of
// `next build` — this repo's committed public/data JSON is what actually
// ships; the server reads it from there too, so there's a single copy).
import { parse } from "csv-parse/sync";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = path.join(__dirname, "..");

// Point this at a local checkout of github.com/liquidslr/leetcode-company-wise-problems.
const REPO_ROOT =
  process.env.CSV_SOURCE_DIR ??
  path.join(WEB_ROOT, "..", "leetcode-company-wise-problems");

if (!fs.existsSync(REPO_ROOT)) {
  console.error(
    `CSV source directory not found: ${REPO_ROOT}\n` +
      `Set CSV_SOURCE_DIR to a local checkout of leetcode-company-wise-problems, e.g.:\n` +
      `  CSV_SOURCE_DIR=/path/to/leetcode-company-wise-problems npm run build:data`
  );
  process.exit(1);
}

const TIMEFRAMES = [
  { key: "thirtyDays", file: "1. Thirty Days.csv" },
  { key: "threeMonths", file: "2. Three Months.csv" },
  { key: "sixMonths", file: "3. Six Months.csv" },
  { key: "moreThanSixMonths", file: "4. More Than Six Months.csv" },
  { key: "all", file: "5. All.csv" },
];

const LEETCODE_PREFIX = "https://leetcode.com/problems/";

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripLink(link) {
  return link.startsWith(LEETCODE_PREFIX)
    ? link.slice(LEETCODE_PREFIX.length).replace(/\/$/, "")
    : link;
}

function parseCsv(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  const rows = parse(raw, { columns: true, skip_empty_lines: true, trim: true });
  return rows.map((row) => ({
    l: stripLink(row.Link),
    t: row.Title,
    d: row.Difficulty.toUpperCase(),
    f: Number(row.Frequency),
    a: Number(row["Acceptance Rate"]),
    tp: row.Topics ? row.Topics.split(",").map((s) => s.trim()).filter(Boolean) : [],
  }));
}

function countDifficulty(records) {
  const counts = { EASY: 0, MEDIUM: 0, HARD: 0 };
  for (const r of records) counts[r.d] = (counts[r.d] ?? 0) + 1;
  return counts;
}

function main() {
  const entries = fs
    .readdirSync(REPO_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== "web" && !e.name.startsWith("."))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b));

  const companiesIndex = [];
  const slugSeen = new Map();

  // Global dedup (built from "5. All.csv" only), keyed by question slug.
  const companyNames = [];
  const questionMap = new Map(); // slug -> { l, t, d, tp, occ: [[companyIdx, freq], ...] }

  let totalRecords = 0;

  for (const companyName of entries) {
    const companyDir = path.join(REPO_ROOT, companyName);
    const slug = slugify(companyName);

    if (slugSeen.has(slug)) {
      console.warn(
        `WARNING: slug collision "${slug}" between "${companyName}" and "${slugSeen.get(slug)}" — skipping "${companyName}"`
      );
      continue;
    }
    slugSeen.set(slug, companyName);

    const timeframes = {};
    const counts = {};
    for (const { key, file } of TIMEFRAMES) {
      const records = parseCsv(path.join(companyDir, file));
      timeframes[key] = records;
      counts[key] = records.length;
      totalRecords += records.length;
    }

    fs.writeFileSync(
      path.join(WEB_ROOT, "public", "data", "companies", `${slug}.json`),
      JSON.stringify({ name: companyName, slug, timeframes })
    );

    companiesIndex.push({
      slug,
      name: companyName,
      counts,
      difficultyCounts: { all: countDifficulty(timeframes.all) },
    });

    // Feed the global index from the "all" bucket only.
    const companyIdx = companyNames.length;
    companyNames.push(companyName);
    for (const rec of timeframes.all) {
      let q = questionMap.get(rec.l);
      if (!q) {
        q = { l: rec.l, t: rec.t, d: rec.d, tp: rec.tp, occ: [] };
        questionMap.set(rec.l, q);
      }
      q.occ.push([companyIdx, rec.f]);
    }
  }

  const questionsIndex = {
    companies: companyNames,
    questions: Array.from(questionMap.values()),
  };

  const write = (filename, data) => {
    const json = JSON.stringify(data);
    fs.writeFileSync(path.join(WEB_ROOT, "public", "data", filename), json);
    return Buffer.byteLength(json);
  };

  const companiesBytes = write("companies.json", companiesIndex);
  const questionsBytes = write("questions-index.json", questionsIndex);

  console.log(`Companies processed: ${companiesIndex.length}`);
  console.log(`Total (company, timeframe-row) records: ${totalRecords}`);
  console.log(`Unique questions (global index, from "All" buckets): ${questionsIndex.questions.length}`);
  console.log(`companies.json: ${(companiesBytes / 1024).toFixed(1)} KB`);
  console.log(`questions-index.json: ${(questionsBytes / 1024).toFixed(1)} KB`);
}

main();
