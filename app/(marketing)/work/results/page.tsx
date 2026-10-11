import { projects } from "@/lib/work";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata = {
  title: "Results — Brandoria",
  description: "The numbers behind the work.",
};

export default function ResultsPage() {
  // Aggregate top-line outcomes from all projects
  const aggregated = [
    { value: "+42%", label: "Enquiries", context: "North & Co." },
    { value: "+31%", label: "Orders", context: "Mira" },
    { value: "+28%", label: "Conversion", context: "North & Co." },
    { value: "5x", label: "Organic traffic", context: "Atlas" },
    { value: "+38%", label: "Return visits", context: "Aurelia" },
    { value: "-22%", label: "Cart abandonment", context: "Mira" },
  ];

  return (
    <>
      <section className="border-b border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Results"
            title="The work should have a purpose."
            description="A better website should help the business. A campaign should have a reason. A digital system should solve a problem."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aggregated.map((r) => (
              <div
                key={r.label}
                className="rounded-2xl border border-border bg-card p-8"
              >
                <p className="text-4xl font-bold text-primary">{r.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {r.label}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {r.context}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="By project"
            title="Outcomes, project by project"
          />
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/40">
                <tr>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Primary outcome</th>
                  <th className="px-6 py-4 font-semibold">Year</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr
                    key={p.slug}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-6 py-4 font-medium">{p.client}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {p.category}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-primary">
                        {p.outcomes[0].value}
                      </span>{" "}
                      <span className="text-muted-foreground">
                        {p.outcomes[0].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {p.year}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}