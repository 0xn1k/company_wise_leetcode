"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Code2,
  LayoutDashboard,
  Building2,
  SearchCode,
  Bookmark,
  Target,
  Search,
  Sparkles,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/shared/command-palette";
import { useCompaniesIndex } from "@/lib/data/use-companies-index";

const LINKS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/companies", label: "Companies", icon: Building2 },
  { href: "/questions", label: "Questions", icon: SearchCode },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/prep", label: "Preparing for", icon: Target },
  { href: "/ai-interview", label: "AI Interview Questions", icon: Sparkles },
];

export function SidebarNav() {
  const pathname = usePathname();
  const companies = useCompaniesIndex();
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <aside className="sticky top-0 flex h-screen w-16 shrink-0 flex-col items-center gap-2 border-r bg-sidebar py-4">
      <Link
        href="/"
        className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary"
      >
        <Code2 className="h-5 w-5" />
      </Link>

      <NavIconButton
        label="Search (⌘K)"
        onClick={() => setPaletteOpen(true)}
        icon={Search}
      />

      <div className="my-1 h-px w-8 bg-border" />

      <nav className="flex flex-col items-center gap-1">
        {LINKS.map((link) => (
          <NavIconLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
            active={pathname === link.href}
          />
        ))}
      </nav>

      <CommandPalette companies={companies} open={paletteOpen} onOpenChange={setPaletteOpen} />
    </aside>
  );
}

function NavIconLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  active: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          aria-label={label}
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
            active
              ? "bg-sidebar-accent text-primary"
              : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          )}
        >
          {active && (
            <span className="absolute -left-2 h-5 w-0.5 rounded-full bg-primary" />
          )}
          <Icon className="h-[18px] w-[18px]" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

function NavIconButton({
  label,
  onClick,
  icon: Icon,
}: {
  label: string;
  onClick: () => void;
  icon: typeof Search;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          onClick={onClick}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <Icon className="h-[18px] w-[18px]" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
