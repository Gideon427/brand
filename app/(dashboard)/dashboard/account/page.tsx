"use client";

import { useSession } from "next-auth/react";
import { Field, TextInput } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  const { data: session } = useSession();

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your profile and business information.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              {(session?.user?.name ?? "U").charAt(0)}
            </div>
            <div>
              <p className="font-semibold tracking-tight">
                {session?.user?.name ?? "—"}
              </p>
              <p className="text-xs text-muted-foreground">
                {session?.user?.email ?? "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Business info */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold tracking-tight">
            Business information
          </h2>
          <div className="mt-6 space-y-5">
            <Field label="Business name">
              <TextInput defaultValue="North & Co." />
            </Field>
            <Field label="Industry">
              <TextInput defaultValue="Professional Services" />
            </Field>
            <Field label="Location">
              <TextInput defaultValue="United Kingdom" />
            </Field>
          </div>
        </div>

        {/* Project summary */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold tracking-tight">Current project</h2>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Project</span>
            <span className="font-medium">North &amp; Co. Website</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium text-primary">72% complete</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Payment</span>
            <span className="font-medium">
              $1,500 due Oct 18
            </span>
          </div>
        </div>

        {/* Help */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold tracking-tight">Need help?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Our team is here for you.
          </p>
          <Button className="mt-4" size="sm">
            Message Brandoria
          </Button>
        </div>

        <div className="flex justify-end">
          <Button size="lg">Save changes</Button>
        </div>
      </div>
    </div>
  );
}