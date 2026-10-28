import { JsonLd } from "@/components/shared/json-ld";
import { SITE_NAME } from "@/lib/site-config";

const FAQS = [
  {
    question: `What is ${SITE_NAME}?`,
    answer:
      "A free tracker for LeetCode interview prep, organized by company. Instead of solving random questions, you see exactly which LeetCode problems a specific company has actually asked, ranked by how frequently and recently they were reported.",
  },
  {
    question: "How often is the question list updated?",
    answer:
      "Frequently. The question list is refreshed on an ongoing basis from various public sources, not a one-time snapshot — so companies' most-asked questions stay current.",
  },
  {
    question: "Is it free to use?",
    answer: "Yes, completely free, with no account or login required.",
  },
  {
    question: "Does it track my solved progress?",
    answer:
      "Yes. Marking a question solved or bookmarking it is saved locally in your browser, so your progress persists across visits without needing an account.",
  },
];

export function FaqSection() {
  return (
    <section className="space-y-3">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <h2 className="text-sm font-medium">Frequently asked questions</h2>
      <dl className="grid gap-3 sm:grid-cols-2">
        {FAQS.map((f) => (
          <div key={f.question} className="rounded-xl border bg-card p-4">
            <dt className="text-sm font-medium">{f.question}</dt>
            <dd className="mt-1.5 text-xs text-muted-foreground">{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
