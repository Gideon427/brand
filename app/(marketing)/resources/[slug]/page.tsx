import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { resources, getResource } from "@/lib/resources";
import { CtaSection } from "@/components/marketing/cta-section";

type Params = { slug: string };

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};
  return {
    title: `${resource.title} — Brandoria`,
    description: resource.excerpt,
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const related = resources
    .filter((r) => r.slug !== resource.slug)
    .slice(0, 3);

  return (
    <>
      <article className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/resources"
            className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            ← All insights
          </Link>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-semibold uppercase tracking-widest text-primary">
              {resource.category}
            </span>
            <span>·</span>
            <span>{resource.readTime}</span>
            <span>·</span>
            <span>{resource.date}</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {resource.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {resource.excerpt}
          </p>

          <div className="mt-10 flex items-center gap-4 border-y border-border py-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {resource.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold">{resource.author}</p>
              <p className="text-xs text-muted-foreground">
                {resource.authorRole}
              </p>
            </div>
          </div>

          <div className="prose prose-neutral mt-12 max-w-none dark:prose-invert">
            {resource.body.map((para, i) => (
              <p
                key={i}
                className="mb-6 text-lg leading-relaxed text-foreground/90"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold tracking-tight">Keep reading</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/resources/${r.slug}`}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {r.category}
                </p>
                <p className="mt-3 font-semibold leading-snug tracking-tight">
                  {r.title}
                </p>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {r.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
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