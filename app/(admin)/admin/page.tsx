import Link from "next/link";
import {
  adminProjects,
  adminTasks,
  impactItems,
} from "@/lib/admin-data";
import { StatCard } from "@/components/admin/stat-card";

export const metadata = { title: "Admin — Brandoria" };

export default function AdminDashboardPage() {
  const activeProjects = adminProjects.length;
  const overdue = adminTasks.filter((t) => t.status !== "review").length;

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything happening across the business today.
        </p>
      </div>

      {/* Revenue */}
      <div className="rounded-2xl border border-border bg-card p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Revenue this month
        </p>
        <div className="mt-2 flex items-baseline gap-3">
          <p className="text-4xl font-bold tracking-tight">$84,500</p>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            +12%
          </span>
        </div>
        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-3/4 rounded-full bg-primary" />
        </div>
      </div>

      {/* KPI cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active projects" value={String(activeProjects)} hint="2 in review" />
        <StatCard label="In progress" value="17" />
        <StatCard label="Client messages" value="5" hint="waiting on reply" />
        <StatCard label="Tasks overdue" value={String(overdue)} delta="Needs attention" />
      </div>

      {/* Two-column: Today + Impact */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Today */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight">Today</h2>
            <Link
              href="/admin/tasks"
              className="text-xs font-medium text-primary hover:underline"
            >
              All tasks
            </Link>
          </div>
          <ul className="mt-6 space-y-3">
            <li className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm">
              <span>3 projects need review</span>
              <span className="text-muted-foreground">Review</span>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm">
              <span>5 client messages waiting</span>
              <span className="text-muted-foreground">Messages</span>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm">
              <span>2 proposals awaiting approval</span>
              <span className="text-muted-foreground">Proposals</span>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm">
              <span>4 tasks overdue</span>
              <span className="text-primary">Overdue</span>
            </li>
          </ul>
        </div>

        {/* Impact analysis */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold tracking-tight">Impact analysis</h2>
          <ul className="mt-6 space-y-4">
            {impactItems.slice(0, 3).map((item) => (
              <li key={item.rank}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold tracking-tight">
                    {item.title}
                  </p>
                  <span
                    className={
                      item.priority === "high"
                        ? "text-xs font-semibold text-primary"
                        : "text-xs font-semibold text-muted-foreground"
                    }
                  >
                    {item.priority.toUpperCase()}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Active work */}
      <div className="mt-6">
        <h2 className="text-lg font-bold tracking-tight">Active work</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {adminProjects.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              href={`/admin/projects/${p.id}`}
              className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40"
            >
              <p className="font-semibold tracking-tight">{p.client}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.title}</p>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${p.progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {p.progress}% complete · due {p.dueDate}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}