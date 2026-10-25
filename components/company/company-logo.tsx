"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import { getCompanyDomain } from "@/lib/data/company-domains";
import { cn } from "@/lib/utils";

export function CompanyLogo({
  name,
  size = 36,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const domain = getCompanyDomain(name);
  const [failed, setFailed] = useState(false);

  const showFallback = !domain || failed;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted",
        className
      )}
      style={{ width: size, height: size }}
    >
      {showFallback ? (
        <Building2 className="h-1/2 w-1/2 text-muted-foreground" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- external favicon, not a local asset
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain p-1.5"
        />
      )}
    </div>
  );
}
