import Link from "next/link";
import { notFound } from "next/navigation";
import { adminProjects, getAdminProject, qaChecks } from "@/lib/admin-data";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const project = getAdminProject(id);
  return { title: project ? `${project.client} — Admin` : "Project" };
}

export function generateStaticParams() {
  return adminProjects.map((p) => ({ id: p.id }));
}

export default async function AdminProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const project = getAdminProject(id);
  if (!project) notFound();

  const checksPassed = qaChecks.filter((c) => c.passed).length;

  return (
    <div className="p-6 lg:p-10">
      <Link
        href="/admin/projects"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← All projects
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {project.client}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Due {project.dueDate} · {project.services.join(" · ")}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card px-6 py-4 text-right">
          <p className="text-3xl font-bold text-primary">{project.progress}%</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            complete
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Tasks */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold tracking-tight">Current tasks</h2>
          <ul className="mt-4 divide-y divide-border">
            {project.tasks.map((t) => (
              <li
                key={t.name}
                className="flex items-center justify-between py-3 text-sm"
              >
                <span>{t.name}</span>
                <span className="text-muted-foreground">{t.owner}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* QA */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight">QA</h2>
            <span className="text-xs text-muted-foreground">
              {checksPassed}/{qaChecks.length} passed
            </span>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {qaChecks.map((c) => (
              <li key={c.label} className="flex items-center gap-3">
                <span
                  className={
                    c.passed
                      ? "h-2 w-2 rounded-full bg-green-500"
                      : "h-2 w-2 rounded-full bg-primary"
                  }
                />
                <span className={c.passed ? "" : "text-muted-foreground"}>
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}