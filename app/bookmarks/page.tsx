import { BookmarksView } from "@/components/question/bookmarks-view";

export const metadata = {
  title: "Bookmarks",
  description: "Your starred LeetCode questions, saved to revisit later.",
  robots: { index: false },
};

export default function BookmarksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Bookmarks</h1>
        <p className="text-sm text-muted-foreground">Questions you&rsquo;ve starred to revisit.</p>
      </div>
      <BookmarksView />
    </div>
  );
}
