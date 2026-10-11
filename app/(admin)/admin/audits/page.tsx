import Link from "next/link";
import { audits } from "@/lib/admin-data";

export const metadata = { title: "Audits — Admin" };

export default function AdminAuditsPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Growth audits</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Business Growth Audit submissions and reviews.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {audits.map((a) => (
          <Link
            key={a.id}
            href={`/admin/audits/${a.id}`}
            className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {a.client}
                </p>
                <p className="mt-1 text-lg font-bold tracking-tight">
                  {a.industry}
                </p>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs capitalize text-muted-foreground">
                {a.status.replace("-", " ")}
              </span>
            </div>

            <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${a.progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {a.areasComplete}/{a.areasTotal} areas
              </span>
              <span>{a.progress}% complete</span>
            </div>

            <p className="mt-4 text-xs text-muted-foreground line-clamp-2">
              {a.notes}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}