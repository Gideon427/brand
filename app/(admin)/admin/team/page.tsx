import { teamMembers } from "@/lib/admin-data";

export const metadata = { title: "Team — Admin" };

export default function AdminTeamPage() {
  const totalTasks = teamMembers.reduce((sum, m) => sum + m.tasks, 0);

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Our team</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          See who&apos;s working on what.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <ul className="divide-y divide-border">
            {teamMembers.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${m.color}`}
                  >
                    {m.initials}
                  </div>
                  <div>
                    <p className="font-semibold tracking-tight">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {m.tasks} tasks
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Team capacity
          </p>
          <p className="mt-3 text-4xl font-bold text-primary">78%</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {totalTasks} total tasks assigned
          </p>
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[78%] rounded-full bg-primary" />
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            2 projects need additional design support
          </p>
        </div>
      </div>
    </div>
  );
}