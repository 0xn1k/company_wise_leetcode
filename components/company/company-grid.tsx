"use client";

import { CompanyCard } from "@/components/company/company-card";
import type { CompanyIndexEntry } from "@/lib/types";

export function CompanyGrid({ companies }: { companies: CompanyIndexEntry[] }) {
  if (companies.length === 0) {
    return <p className="py-12 text-center text-sm text-muted-foreground">No companies found.</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard key={company.slug} company={company} />
      ))}
    </div>
  );
}
