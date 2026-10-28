"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CompanySearchInput } from "@/components/company/company-search-input";
import { CompanyGrid } from "@/components/company/company-grid";
import type { CompanyIndexEntry } from "@/lib/types";

export function CompaniesBrowser({ companies }: { companies: CompanyIndexEntry[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  // Keep the URL's `q` param in sync so searches are shareable links and
  // back/forward the SearchAction sitelinks box in Google's JSON-LD metadata.
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) params.set("q", query);
    else params.delete("q");
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only resync when the query itself changes
  }, [query]);

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
