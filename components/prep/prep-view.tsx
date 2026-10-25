"use client";

import { CompanyPickerDialog } from "@/components/prep/company-picker-dialog";
import { PreparingForList } from "@/components/prep/preparing-for-list";
import { useCompaniesIndex } from "@/lib/data/use-companies-index";

export function PrepView() {
  const companies = useCompaniesIndex();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Preparing for</h1>
          <p className="text-sm text-muted-foreground">
            Track focused progress across the companies you&rsquo;re targeting.
          </p>
        </div>
        <CompanyPickerDialog companies={companies} />
      </div>
      <PreparingForList companies={companies} />
    </div>
  );
}
