import { adminTasks } from "@/lib/admin-data";

export const metadata = { title: "Tasks — Admin" };

const columns = [
  { key: "todo", label: "To do" },
  { key: "in-progress", label: "In progress" },
  { key: "review", label: "Review" },
] as const;

export default function AdminTasksPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {adminTasks.length} tasks across the team.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {columns.map((col) => {
          const items = adminTasks.filter((t) => t.status === col.key);
          return (
            <div
              key={col.key}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold tracking-tight">{col.label}</p>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {items.length}
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {items.map((t) => (
                  <li
                    key={t.id}
                    className="rounded-xl border border-border bg-background p-4"
                  >
                    <p className="text-sm font-medium tracking-tight">
                      {t.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t.project} · {t.owner}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Due {t.due}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}