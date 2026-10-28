import { Sparkles } from "lucide-react";
import { CompanyLogo } from "@/components/company/company-logo";
import { EmptyState } from "@/components/shared/empty-state";

export const metadata = {
  title: "AI Interview Questions",
  description: "Interview questions from AI companies — coming soon.",
};

const AI_COMPANIES = ["OpenAI", "Anthropic", "Google DeepMind", "Microsoft", "xAI", "Mistral"];

export default function AiInterviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI Interview Questions</h1>
        <p className="text-sm text-muted-foreground">
          Interview questions asked at leading AI companies.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-card px-4 py-3">
        {AI_COMPANIES.map((name) => (
          <span key={name} title={name}>
            <CompanyLogo name={name} size={28} />
          </span>
        ))}
      </div>

      <EmptyState
        icon={Sparkles}
        title="Coming soon"
        description="We're building out a dedicated set of interview questions for AI companies. Check back soon."
      />
    </div>
  );
}
