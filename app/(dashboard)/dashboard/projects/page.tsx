import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clientProject } from "@/lib/client-data";

export const metadata = { title: "Projects — Brandoria" };

export default function DashboardProjectsPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything currently in flight with Brandoria.
        </p>
      </div>

      <Link
        href={`/dashboard/projects/${clientProject.id}`}
        className="group block overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/40"
      >
        <div className="grid gap-8 p-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Active project
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              {clientProject.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Current stage: {clientProject.currentStage} · Due {clientProject.dueDate}
            </p>

            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${clientProject.progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {clientProject.progress}% complete
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Next action
              </p>
              <p className="mt-2 text-sm font-medium">
                {clientProject.nextAction}
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Open project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}