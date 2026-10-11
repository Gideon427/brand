import { impactItems } from "@/lib/admin-data";

export const metadata = { title: "Reports — Admin" };

const priorityStyle: Record<string, string> = {
  high: "bg-primary text-primary-foreground",
  medium: "bg-primary/20 text-primary",
  low: "bg-muted text-muted-foreground",
};

export default function AdminReportsPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Impact analysis</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          What we recommend focusing on next.
        </p>
      </div>

      <div className="space-y-4">
        {impactItems.map((item) => (
          <div
            key={item.rank}
            className="grid gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-12 md:items-center"
          >
            <div className="md:col-span-1">
              <p className="text-2xl font-bold text-muted-foreground/60">
                {item.rank}
              </p>
            </div>
            <div className="md:col-span-7">
              <p className="text-lg font-bold tracking-tight">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            <div className="md:col-span-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${priorityStyle[item.priority]}`}
              >
                {item.priority}
              </span>
            </div>
            <div className="md:col-span-2 flex md:justify-end">
              <button className="rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-muted">
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6">
        <div>
          <p className="text-sm font-semibold tracking-tight">
            Report status
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Ready for review
          </p>
        </div>
        <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          Send to client
        </button>
      </div>
    </div>
  );
}