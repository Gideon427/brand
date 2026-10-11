import Link from "next/link";
import { notFound } from "next/navigation";
import { audits, getAudit } from "@/lib/admin-data";

type Params = { id: string };

export function generateStaticParams() {
  return audits.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const audit = getAudit(id);
  return { title: audit ? `${audit.client} — Audit` : "Audit" };
}

const areas = [
  "Business",
  "Customers",
  "Products",
  "Revenue",
  "Acquisition",
  "Digital presence",
  "Operations",
  "Goals",
];

export default async function AdminAuditPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const audit = getAudit(id);
  if (!audit) notFound();

  return (
    <div className="p-6 lg:p-10">
      <Link
        href="/admin/audits"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← All audits
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Growth Audit
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {audit.client}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {audit.industry} · {audit.location}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card px-6 py-4 text-right">
          <p className="text-3xl font-bold text-primary">{audit.progress}%</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            complete
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold tracking-tight">Coverage</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {areas.map((area, i) => {
              const done = i < audit.areasComplete;
              return (
                <li
                  key={area}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3"
                >
                  <span
                    className={
                      done
                        ? "h-2 w-2 rounded-full bg-green-500"
                        : "h-2 w-2 rounded-full bg-muted-foreground/40"
                    }
                  />
                  <span className={done ? "" : "text-muted-foreground"}>
                    {area}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Current revenue
            </p>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {audit.monthlyRevenue}
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Target revenue
            </p>
            <p className="mt-2 text-2xl font-bold text-primary">
              {audit.targetRevenue}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Internal note
            </p>
            <p className="mt-2 text-sm">{audit.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}