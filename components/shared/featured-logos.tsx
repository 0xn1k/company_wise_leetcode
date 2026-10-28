"use client";

import Link from "next/link";
import { CompanyLogo } from "@/components/company/company-logo";
import { useCompaniesIndex } from "@/lib/data/use-companies-index";
import { useMounted } from "@/lib/utils/use-mounted";

const FAANG = ["Meta", "Apple", "Amazon", "Netflix", "Google"];
const AI_COMPANIES = ["OpenAI", "Anthropic", "Google DeepMind", "Microsoft", "xAI", "Mistral"];

export function FeaturedLogos() {
  const mounted = useMounted();
  const companies = useCompaniesIndex();
  // The companies index can already be warm in module-level cache on the
  // client (e.g. after visiting /companies earlier), while SSR always
  // starts empty — gate link resolution on mount so the first client paint
  // matches the server-rendered markup.
  const slugByName = new Map(mounted ? companies.map((c) => [c.name, c.slug]) : []);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <LogoGroup title="FAANG" names={FAANG} slugByName={slugByName} />
      <LogoGroup title="AI companies" names={AI_COMPANIES} slugByName={slugByName} />
    </div>
  );
}

function LogoGroup({
  title,
  names,
  slugByName,
}: {
  title: string;
  names: string[];
  slugByName: Map<string, string>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-background/60 px-4 py-3">
      <span className="text-xs font-medium text-muted-foreground">{title}</span>
      <div className="flex flex-wrap items-center gap-2">
        {names.map((name) => {
          const slug = slugByName.get(name);
          const logo = (
            <CompanyLogo
              name={name}
              size={28}
              className="transition-transform hover:scale-110"
            />
          );
          return slug ? (
            <Link key={name} href={`/companies/${slug}`} aria-label={name} title={name}>
              {logo}
            </Link>
          ) : (
            <span key={name} title={name}>
              {logo}
            </span>
          );
        })}
      </div>
    </div>
  );
}
