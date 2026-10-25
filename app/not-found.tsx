import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
        <Compass className="h-7 w-7 text-primary" />
      </div>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          That page doesn&rsquo;t exist, or the company isn&rsquo;t in our list.
        </p>
      </div>
      <div className="flex gap-2 pt-2">
        <Button asChild>
          <Link href="/">Back to dashboard</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/companies">Browse companies</Link>
        </Button>
      </div>
    </div>
  );
}
