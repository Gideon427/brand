import { clientProject } from "@/lib/client-data";

export const metadata = { title: "Progress — Brandoria" };

export default function ProgressPage() {
  const completed = clientProject.tasks.filter((t) => t.done).length;
  const total = clientProject.tasks.length;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference * (1 - clientProject.progress / 100);

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Project progress</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {completed} of {total} tasks complete. Development under way.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Circular progress */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="flex justify-center">
            <div className="relative h-40 w-40">
              <svg className="h-full w-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  className="text-muted"
                  strokeWidth="10"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  className="text-primary"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold">
                  {clientProject.progress}%
                </p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-xs font-semibold uppercase tracking-widest text-primary">
            On track
          </p>
        </div>

        {/* Milestones */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold tracking-tight">Milestones</h2>
          <ul className="mt-6 space-y-4">
            {clientProject.milestones.map((m) => (
              <li
                key={m.name}
                className="flex items-center justify-between rounded-xl border border-border bg-background px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={
                      m.status === "complete"
                        ? "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                        : m.status === "in-progress"
                          ? "flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary text-primary"
                          : "flex h-8 w-8 items-center justify-center rounded-full border-2 border-border text-muted-foreground"
                    }
                  >
                    {m.status === "complete" ? "✓" : "·"}
                  </span>
                  <span className="font-medium tracking-tight">{m.name}</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {m.status === "complete"
                    ? "Complete"
                    : m.status === "in-progress"
                      ? "In progress"
                      : "Upcoming"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Up next */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Up next
        </p>
        <p className="mt-2 text-lg font-semibold tracking-tight">
          {clientProject.nextAction}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;ve added the latest version for you to review.
        </p>
        <button className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          Review now
        </button>
      </div>
    </div>
  );
}