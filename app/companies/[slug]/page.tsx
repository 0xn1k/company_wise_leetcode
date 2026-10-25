import { notFound } from "next/navigation";
import { getCompany, getAllCompanySlugs } from "@/lib/data/get-company";
import { CompanyDetailView } from "@/components/company/company-detail-view";
import { CompanyLogo } from "@/components/company/company-logo";

export function generateStaticParams() {
  return getAllCompanySlugs().map((slug) => ({ slug }));
}

// All 470 slugs are enumerated above and fully static — no per-request
// dynamic param resolution needed.
export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) return { title: "Company not found" };

  const count = company.timeframes.all.length;
  return {
    title: `${company.name} LeetCode Questions`,
    description: `${count} LeetCode interview questions asked at ${company.name}, ranked by frequency across five timeframes. Track your solved progress.`,
  };
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CompanyLogo name={company.name} size={44} />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{company.name}</h1>
          <p className="text-sm text-muted-foreground">
            {company.timeframes.all.length} questions across 5 timeframes.
          </p>
        </div>
      </div>
      <CompanyDetailView company={company} />
    </div>
  );
}
