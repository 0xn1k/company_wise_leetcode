"use client";

import { useMemo, useState } from "react";
import { CompanySearchInput } from "@/components/company/company-search-input";
import { CompanyGrid } from "@/components/company/company-grid";
import type { CompanyIndexEntry } from "@/lib/types";

export function CompaniesBrowser({ companies }: { companies: CompanyIndexEntry[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => c.name.toLowerCase().includes(q));
  }, [companies, query]);

  return (
    <div className="space-y-4">
      <div className="max-w-sm">
        <CompanySearchInput value={query} onChange={setQuery} />
      </div>
      <CompanyGrid companies={filtered} />
    </div>
  );
}
