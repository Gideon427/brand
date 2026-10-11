import { Button } from "@/components/ui/button";

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        We couldn&apos;t find that.
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        It may have been moved, or the link may be outdated.
      </p>
      <div className="mt-6">
        <Button href="/dashboard">Back to dashboard</Button>
      </div>
    </div>
  );
}