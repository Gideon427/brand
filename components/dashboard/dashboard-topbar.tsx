"use client";

import { useSession } from "next-auth/react";
import { Bell } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function DashboardTopbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
      <div>
        <p className="text-sm font-semibold tracking-tight">
          Good morning, {session?.user?.name?.split(" ")[0] ?? "there"}
        </p>
        <p className="text-xs text-muted-foreground">
          Here&apos;s what&apos;s happening with your project.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
        <ThemeToggle />
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {(session?.user?.name ?? "U").charAt(0)}
        </div>
      </div>
    </header>
  );
}