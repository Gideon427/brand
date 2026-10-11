import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { projects, getProject } from "@/lib/work";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/marketing/cta-section";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.client} — Case Study — Brandoria`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const other = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/work/case-studies"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            ← All case studies
          </Link>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            {project.category}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {project.summary}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {project.client}
            </span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.services.join(", ")}</span>
          </div>
        </div>
      </section>

      {/* Cover */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={`flex aspect-[16/8] items-center justify-center rounded-3xl bg-gradient-to-br ${project.coverGradient}`}
          >
            <p className="text-3xl font-bold tracking-tight sm:text-5xl">
              {project.client}
            </p>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {project.outcomes.map((o) => (
              <div
                key={o.label}
                className="rounded-2xl border border-border bg-card p-8"
              >
                <p className="text-4xl font-bold text-primary">{o.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {o.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="border-t border-border py-20">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-3">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Challenge
            </p>
            <p className="text-muted-foreground">{project.challenge}</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Approach
            </p>
            <p className="text-muted-foreground">{project.approach}</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Result
            </p>
            <p className="text-muted-foreground">{project.result}</p>
          </div>
        </div>
      </section>

      {/* Quote */}
      {project.quote && (
        <section className="border-t border-border bg-muted/20 py-20">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-2xl font-medium leading-relaxed tracking-tight">
              &ldquo;{project.quote.text}&rdquo;
            </p>
            <div className="mt-6">
              <p className="font-semibold">{project.quote.author}</p>
              <p className="text-sm text-muted-foreground">
                {project.quote.role}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Other projects */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              More case studies
            </h2>
            <Button href="/work/case-studies" variant="outline">
              View all
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {other.map((p) => (
              <Link
                key={p.slug}
                href={`/work/case-studies/${p.slug}`}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {p.category}
                </p>
                <p className="mt-3 text-lg font-bold tracking-tight">
                  {p.client}
                </p>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {p.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}