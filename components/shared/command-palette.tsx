"use client";

import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Building2, Bookmark, LayoutDashboard, Target, SearchCode } from "lucide-react";
import { CompanyLogo } from "@/components/company/company-logo";
import type { CompanyIndexEntry } from "@/lib/types";

const STATIC_LINKS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/companies", label: "Companies", icon: Building2 },
  { href: "/questions", label: "Global questions", icon: SearchCode },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/prep", label: "Preparing for", icon: Target },
];

export function CommandPalette({
  companies,
  open,
  onOpenChange,
}: {
  companies: CompanyIndexEntry[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const setOpen = onOpenChange;
  const router = useRouter();

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to a page or company..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {STATIC_LINKS.map(({ href, label, icon: Icon }) => (
            <CommandItem key={href} value={label} onSelect={() => go(href)}>
              <Icon className="h-4 w-4" />
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Companies">
          {companies.map((company) => (
            <CommandItem
              key={company.slug}
              value={company.name}
              onSelect={() => go(`/companies/${company.slug}`)}
            >
              <CompanyLogo name={company.name} size={18} className="rounded" />
              {company.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
