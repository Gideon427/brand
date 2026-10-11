"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Field, TextInput } from "@/components/ui/field";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    if (!res || res.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    // Determine redirect target based on role
    const session = await fetch("/api/auth/session").then((r) => r.json());
    const role = session?.user?.role as "admin" | "client" | undefined;

    router.push(role === "admin" ? "/admin" : "/dashboard");
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Client login</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to access your projects and messages.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <Field label="Email">
          <TextInput
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            autoComplete="email"
          />
        </Field>
        <Field label="Password">
          <TextInput
            name="password"
            type="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </Field>

        {error && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <div className="mt-8 rounded-xl border border-border bg-muted/40 p-4 text-xs">
        <p className="font-semibold tracking-tight">Demo accounts</p>
        <ul className="mt-2 space-y-1 text-muted-foreground">
          <li>
            Admin — <code>admin@brandoria.co</code> / <code>admin</code>
          </li>
          <li>
            Client — <code>emma@north.co</code> / <code>client</code>
          </li>
        </ul>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a href="/start-a-project" className="text-primary hover:underline">
          Start a project
        </a>
      </p>
    </div>
  );
}