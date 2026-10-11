"use client";

import { useSession } from "next-auth/react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function AdminTopbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
      <p className="text-sm text-muted-foreground">
        {greeting()}, {session?.user?.name?.split(" ")[0] ?? "there"}
      </p>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {(session?.user?.name ?? "U").charAt(0)}
        </div>
      </div>
    </header>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}