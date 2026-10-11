import { clients } from "@/lib/admin-data";

export const metadata = { title: "Clients — Admin" };

const statusStyle: Record<string, string> = {
  active: "bg-green-500/10 text-green-700 dark:text-green-400",
  onboarding: "bg-primary/10 text-primary",
  paused: "bg-muted text-muted-foreground",
};

export default function AdminClientsPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {clients.length} active clients.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-6 py-4 font-semibold">Client</th>
              <th className="px-6 py-4 font-semibold">Industry</th>
              <th className="px-6 py-4 font-semibold">Location</th>
              <th className="px-6 py-4 font-semibold">Projects</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr
                key={c.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-6 py-4 font-medium">{c.name}</td>
                <td className="px-6 py-4 text-muted-foreground">
                  {c.industry}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {c.location}
                </td>
                <td className="px-6 py-4">{c.projects}</td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}