"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
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
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Something went wrong
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        We hit an unexpected error.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Try again, or go back to the homepage. If it keeps happening, let us
        know.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="outline">
          Back to home
        </Button>
      </div>
    </div>
  );
}
