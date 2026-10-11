import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardTopbar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}