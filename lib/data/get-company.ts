import fs from "node:fs";
import path from "node:path";
import type { CompanyDetail } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "public", "data");

export function getCompany(slug: string): CompanyDetail | null {
  const filePath = path.join(DATA_DIR, "companies", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function getAllCompanySlugs(): string[] {
  const dir = path.join(DATA_DIR, "companies");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}
