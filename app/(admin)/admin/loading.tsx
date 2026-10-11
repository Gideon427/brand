import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="p-6 lg:p-10">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mt-2 h-4 w-72" />

      <div className="mt-8 rounded-2xl border border-border bg-card p-8">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="mt-4 h-10 w-56" />
        <Skeleton className="mt-6 h-2 w-full" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-4 h-8 w-20" />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <Skeleton className="h-5 w-24" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <Skeleton className="h-5 w-32" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}