"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminError({
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
        Admin error
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Something went wrong in the admin.
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Try reloading the page. If it keeps happening, check the console.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/admin" variant="outline">
          Back to dashboard
        </Button>
      </div>
    </div>
  );
}