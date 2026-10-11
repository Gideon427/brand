export function StatCard({
  label,
  value,
  delta,
  hint,
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
      {delta && <p className="mt-1 text-xs text-primary">{delta}</p>}
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}