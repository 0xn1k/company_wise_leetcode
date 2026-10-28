"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "bookmark-reminder-seen";
const SHOW_DELAY_MS = 5000;

export function BookmarkReminderModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore — storage unavailable (private mode, etc.)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : dismiss())}>
      <DialogContent>
        <DialogHeader>
          <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Bookmark className="h-5 w-5" />
          </div>
          <DialogTitle>Bookmark this page</DialogTitle>
          <DialogDescription>
            Please bookmark this site for your future company-wise prep. We
            frequently update the question list based on various sources, so
            it&rsquo;s worth coming back to.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={dismiss}>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
