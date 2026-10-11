import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  clientProject,
  clientMessages,
  recentActivity,
} from "@/lib/client-data";

export const metadata = { title: "Dashboard — Brandoria" };

export default function DashboardHomePage() {
  return (
    <div className="p-6 lg:p-10">
      {/* Hero card */}
      <div className="rounded-3xl border border-border bg-card p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Current project
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight">
              {clientProject.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {clientProject.progress}% complete · Stage: {clientProject.currentStage}
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-primary">
              {clientProject.progress}%
            </p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              complete
            </p>
          </div>
        </div>

        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${clientProject.progress}%` }}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-background p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Next action
            </p>
            <p className="mt-1 font-medium tracking-tight">
              {clientProject.nextAction}
            </p>
          </div>
          <Link
            href={`/dashboard/projects/${clientProject.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            View project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Two columns */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Messages */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight">Messages</h2>
            <Link
              href="/dashboard/messages"
              className="text-xs font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <ul className="mt-6 space-y-4">
            {clientMessages.slice(-2).map((m) => (
              <li key={m.id} className="flex gap-3">
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    m.from === "team"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold tracking-tight">
                      {m.author}
                    </p>
                    <p className="text-xs text-muted-foreground">{m.time}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {m.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent activity */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold tracking-tight">Recent activity</h2>
          <ul className="mt-6 space-y-4">
            {recentActivity.map((a) => (
              <li key={a.id} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-sm">{a.label}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/dashboard/files"
          className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40"
        >
          <p className="font-semibold tracking-tight">Your files</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything we&apos;ve shared with you, in one place.
          </p>
        </Link>
        <Link
          href="/dashboard/progress"
          className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40"
        >
          <p className="font-semibold tracking-tight">Project progress</p>
          <p className="mt-1 text-sm text-muted-foreground">
            See exactly where things stand.
          </p>
        </Link>
        <Link
          href="/dashboard/billing"
          className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40"
        >
          <p className="font-semibold tracking-tight">Billing</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Invoices and next payment.
          </p>
        </Link>
      </div>
    </div>
  );
}