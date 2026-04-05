import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 md:flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="min-h-[calc(100vh-88px)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}