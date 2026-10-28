import { GlobalQuestionsView } from "@/components/question/global-questions-view";

export const metadata = {
  title: "All Questions",
  description:
    "Every unique LeetCode question asked across 470 companies, searchable and filterable by difficulty.",
  alternates: { canonical: "/questions" },
};

export default function QuestionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">All questions</h1>
        <p className="text-sm text-muted-foreground">
          Every unique question across all 470 companies, deduplicated.
        </p>
      </div>
      <GlobalQuestionsView />
    </div>
  );
}
