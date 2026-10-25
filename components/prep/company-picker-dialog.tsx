"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { CompanyLogo } from "@/components/company/company-logo";
import { useTrackerStore } from "@/lib/store/tracker-store";
import type { CompanyIndexEntry } from "@/lib/types";

export function CompanyPickerDialog({ companies }: { companies: CompanyIndexEntry[] }) {
  const [open, setOpen] = useState(false);
  const preparingFor = useTrackerStore((s) => s.preparingFor);
  const addPreparingFor = useTrackerStore((s) => s.addPreparingFor);

  const available = companies.filter((c) => !preparingFor.includes(c.slug));

  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm" className="gap-1.5">
        <Plus className="h-4 w-4" />
        Add company
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search companies to prepare for..." />
        <CommandList>
          <CommandEmpty>No companies found.</CommandEmpty>
          <CommandGroup>
            {available.map((company) => (
              <CommandItem
                key={company.slug}
                value={company.name}
                onSelect={() => {
                  addPreparingFor(company.slug);
                  setOpen(false);
                }}
              >
                <CompanyLogo name={company.name} size={18} className="rounded" />
                {company.name}
                <span className="ml-auto text-xs text-muted-foreground">
                  {company.counts.all} questions
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
