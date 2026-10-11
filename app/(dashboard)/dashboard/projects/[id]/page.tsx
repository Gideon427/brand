import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { clientProject } from "@/lib/client-data";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  return {
    title:
      id === clientProject.id
        ? `${clientProject.title} — Brandoria`
        : "Project",
  };
}

export default async function ClientProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  if (id !== clientProject.id) notFound();

  const completed = clientProject.tasks.filter((t) => t.done).length;

  return (
    <div className="p-6 lg:p-10">
      <Link
        href="/dashboard/projects"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← All projects
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Project
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {clientProject.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {completed} of {clientProject.tasks.length} tasks complete · Due{" "}
            {clientProject.dueDate}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card px-6 py-4 text-right">
          <p className="text-3xl font-bold text-primary">
            {clientProject.progress}%
          </p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            complete
          </p>
        </div>
      </div>

      {/* Live preview */}
      <div className="mt-8 rounded-3xl border border-border bg-card p-4">
        <div className="flex items-center gap-1.5 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-muted-foreground">
            northandco.co.uk
          </span>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            North &amp; Co.
          </p>
          <p className="mt-3 max-w-md text-3xl font-bold leading-tight tracking-tight">
            Advice that moves your business north.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Trusted accountancy &amp; consulting for growing firms.
          </p>
          <button className="mt-6 rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground">
            Book a call
          </button>
        </div>
      </div>

      {/* Tasks + next */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold tracking-tight">Milestones</h2>
          <ul className="mt-4 divide-y divide-border">
            {clientProject.tasks.map((t) => (
              <li
                key={t.name}
                className="flex items-center justify-between py-3 text-sm"
              >
                <span className={t.done ? "" : "text-muted-foreground"}>
                  {t.name}
                </span>
                <span
                  className={
                    t.done
                      ? "text-xs font-semibold text-primary"
                      : "text-xs text-muted-foreground"
                  }
                >
                  {t.done ? "Complete" : "In progress"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Next action
          </p>
          <p className="mt-2 font-medium tracking-tight">
            {clientProject.nextAction}
          </p>
          <Link
            href="/dashboard/progress"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            See progress
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}