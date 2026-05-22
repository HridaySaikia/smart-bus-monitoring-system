import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import AdminGuard from "@/components/auth/AdminGuard";
import BackButton from "@/components/BackButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-background md:flex">
        <Sidebar />

        <div className="flex-1">
          <Topbar />

          <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-background via-slate-950 to-background p-4 sm:p-6">

            {/* 🔥 ADD THIS LINE */}
            <div className="mb-4 flex justify-end">
              <BackButton />
            </div>

            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}