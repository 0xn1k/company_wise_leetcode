import { Suspense } from "react";
import { CompaniesBrowser } from "@/components/company/companies-browser";
import { getCompaniesIndex } from "@/lib/data/get-companies-index";

export const metadata = {
  title: "Companies",
  description: "Browse 470 companies and their most-asked LeetCode interview questions.",
  alternates: { canonical: "/companies" },
};

export default function CompaniesPage() {
  const companies = getCompaniesIndex();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Companies</h1>
        <p className="text-sm text-muted-foreground">
          Browse {companies.length} companies and their LeetCode question lists.
        </p>
      </div>
      <Suspense fallback={null}>
        <CompaniesBrowser companies={companies} />
      </Suspense>
    </div>
  );
}
