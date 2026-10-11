import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/work";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata = {
  title: "Case Studies — Brandoria",
  description: "How we've helped real businesses grow.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Case Studies"
            title="The work, in detail."
            description="Each project starts with a real problem. Here's what we did and what changed."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="divide-y divide-border">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/case-studies/${p.slug}`}
                className="group grid gap-6 py-10 transition-colors md:grid-cols-12 md:items-center"
              >
                <div className="md:col-span-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {p.category}
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight">
                    {p.client}
                  </p>
                </div>
                <div className="md:col-span-6">
                  <p className="text-lg font-medium tracking-tight">
                    {p.title}
                  </p>
                  <p className="mt-2 text-muted-foreground">{p.summary}</p>
                </div>
                <div className="flex items-center justify-between md:col-span-3 md:justify-end md:gap-6">
                  <div className="text-left md:text-right">
                    <p className="text-2xl font-bold text-primary">
                      {p.outcomes[0].value}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {p.outcomes[0].label}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}