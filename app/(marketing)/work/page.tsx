import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/work";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata = {
  title: "Work — Brandoria",
  description:
    "Real websites, brands, campaigns and digital experiences built for real business needs.",
};

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Work"
            title="See what we build."
            description="Real websites, brands, campaigns and digital experiences built for real business needs."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/case-studies/${p.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div
                  className={`flex aspect-[16/10] items-center justify-center bg-gradient-to-br ${p.coverGradient} p-8`}
                >
                  <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                      {p.category}
                    </p>
                    <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                      {p.title}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold tracking-tight">{p.client}</p>
                    <p className="text-xs text-muted-foreground">{p.year}</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {p.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
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