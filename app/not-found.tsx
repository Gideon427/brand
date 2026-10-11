import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        That page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        It may have moved, or you may have typed the address wrong.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/contact" variant="outline">
          Contact us
        </Button>
      </div>
    </div>
  );
}