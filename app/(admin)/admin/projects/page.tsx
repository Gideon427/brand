import Link from "next/link";
import { adminProjects } from "@/lib/admin-data";

export const metadata = { title: "Projects — Admin" };

const statusLabels: Record<string, string> = {
  discovery: "Discovery",
  design: "Design",
  development: "Development",
  review: "Client review",
  delivery: "Delivery",
};

export default function AdminProjectsPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {adminProjects.length} active projects.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {adminProjects.map((p) => (
          <Link
            key={p.id}
            href={`/admin/projects/${p.id}`}
            className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {p.client}
                </p>
                <p className="mt-1 text-lg font-bold tracking-tight">
                  {p.title}
                </p>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                {statusLabels[p.status]}
              </span>
            </div>

            <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${p.progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{p.progress}% complete</span>
              <span>Due {p.dueDate}</span>
            </div>

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
          </Link>
        ))}
      </div>
    </div>
  );
}