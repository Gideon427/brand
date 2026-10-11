import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex flex-col p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">
            BRANDORIA
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Built for business.
        </p>
      </div>

      {/* Right: brand panel */}
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-primary-foreground">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
              Brandoria
            </p>
            <h2 className="mt-6 max-w-md text-4xl font-bold leading-tight tracking-tight">
              Make your business easier to find, trust and buy from.
            </h2>
          </div>
          <div className="space-y-4 text-sm opacity-90">
            <p>&ldquo;Brandoria didn&apos;t just give us a new website. They helped us understand what our business actually needed.&rdquo;</p>
            <p className="font-semibold">Elena Marlowe · Director, North &amp; Co.</p>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-20 h-96 w-96 rounded-full bg-black/10 blur-3xl" />
      </div>
    </div>
  );
}