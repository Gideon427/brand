import { Field, TextInput, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Settings — Admin" };

export default function AdminSettingsPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Workspace preferences and defaults.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold tracking-tight">Workspace</h2>
          <div className="mt-6 space-y-5">
            <Field label="Workspace name">
              <TextInput defaultValue="Brandoria" />
            </Field>
            <Field label="Primary contact">
              <TextInput defaultValue="hello@brandoria.co" />
            </Field>
            <Field label="Timezone">
              <Select defaultValue="Europe/London">
                <option>Europe/London</option>
                <option>Europe/Dublin</option>
                <option>Africa/Lagos</option>
              </Select>
            </Field>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold tracking-tight">Notifications</h2>
          <div className="mt-6 space-y-3">
            {[
              "New audit submissions",
              "New project briefs",
              "Client messages",
              "Overdue tasks",
            ].map((n) => (
              <label
                key={n}
                className="flex items-center justify-between text-sm"
              >
                <span>{n}</span>
                <input type="checkbox" defaultChecked className="accent-primary" />
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="lg">Save changes</Button>
        </div>
      </div>
    </div>
  );
}