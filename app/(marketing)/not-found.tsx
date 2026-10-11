import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-4 text-muted-foreground">
        The link may be outdated, or the page may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/services" variant="outline">
          Browse services
        </Button>
      </div>
      <p className="mt-8 text-xs text-muted-foreground">
        Still stuck?{" "}
        <Link href="/contact" className="text-primary hover:underline">
          Contact us
        </Link>
      </p>
    </section>
  );
}