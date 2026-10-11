import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resources } from "@/lib/resources";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata = {
  title: "Insights — Brandoria",
  description: "Ideas for building a better business.",
};

export default function ResourcesPage() {
  const [featured, ...rest] = resources;

  return (
    <>
      <section className="border-b border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Insights"
            title="Ideas for building a better business."
            description="Practical writing on websites, growth, content and systems."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Featured */}
          <Link
            href={`/resources/${featured.slug}`}
            className="group block overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/40"
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 lg:aspect-auto">
                <div className="text-center px-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {featured.category}
                  </p>
                  <p className="mt-3 text-2xl font-bold tracking-tight">
                    {featured.title}
                  </p>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{featured.category}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight">
                  {featured.title}
                </h2>
                <p className="mt-4 text-muted-foreground">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((r) => (
              <Link
                key={r.slug}
                href={`/resources/${r.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40"
              >
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-semibold uppercase tracking-widest text-primary">
                    {r.category}
                  </span>
                  <span>·</span>
                  <span>{r.readTime}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight">
                  {r.title}
                </h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {r.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}