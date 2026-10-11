import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="p-6 lg:p-10">
      <div className="rounded-3xl border border-border bg-card p-8">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="mt-4 h-8 w-72" />
        <Skeleton className="mt-2 h-4 w-56" />
        <Skeleton className="mt-6 h-2 w-full" />
        <Skeleton className="mt-6 h-20 w-full" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <Skeleton className="h-5 w-24" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <Skeleton className="h-5 w-32" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}