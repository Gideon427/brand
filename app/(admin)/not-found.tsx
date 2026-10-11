import { Button } from "@/components/ui/button";

export default function AdminNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Admin page not found.
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Check the URL, or head back to the dashboard.
      </p>
      <div className="mt-6">
        <Button href="/admin">Back to admin</Button>
      </div>
    </div>
  );
}