"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Something went wrong
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        We couldn&apos;t load this page.
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Try again, or reach out to the Brandoria team if it keeps happening.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/dashboard" variant="outline">
          Back to dashboard
        </Button>
      </div>
    </div>
  );
}