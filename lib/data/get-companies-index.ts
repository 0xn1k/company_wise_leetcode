import fs from "node:fs";
import path from "node:path";
import type { CompanyIndexEntry } from "@/lib/types";

export function getCompaniesIndex(): CompanyIndexEntry[] {
  const filePath = path.join(process.cwd(), "public", "data", "companies.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
