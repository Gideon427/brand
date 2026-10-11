import { invoice, billingHistory } from "@/lib/client-data";

export const metadata = { title: "Billing — Brandoria" };

export default function BillingPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Invoices, payments and next due date.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Next payment */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Next payment
          </p>
          <div className="mt-4 flex flex-wrap items-baseline gap-4">
            <p className="text-5xl font-bold tracking-tight">
              {invoice.amount}
            </p>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {invoice.status}
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Invoice {invoice.number} · Due {invoice.dueDate}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              Pay now
            </button>
            <button className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted">
              View invoice
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Total paid
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight">$6,500</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Across 3 invoices
          </p>
          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Current project value
            </p>
            <p className="mt-2 text-lg font-bold">$4,500</p>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-6 py-4 font-semibold">Invoice</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Paid</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {billingHistory.map((b) => (
              <tr
                key={b.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-6 py-4 font-medium">{b.number}</td>
                <td className="px-6 py-4">{b.amount}</td>
                <td className="px-6 py-4 text-muted-foreground">{b.paid}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400">
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-xs font-medium text-primary hover:underline">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}