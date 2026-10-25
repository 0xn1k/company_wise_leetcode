"use client";

import { useEffect, useState } from "react";
import type { CompanyIndexEntry } from "@/lib/types";

let cache: CompanyIndexEntry[] | null = null;

export function useCompaniesIndex(): CompanyIndexEntry[] {
  const [companies, setCompanies] = useState<CompanyIndexEntry[]>(() => cache ?? []);

  useEffect(() => {
    if (cache) return;
    fetch("/data/companies.json")
      .then((res) => res.json())
      .then((data: CompanyIndexEntry[]) => {
        cache = data;
        setCompanies(data);
      });
  }, []);

  return companies;
}
