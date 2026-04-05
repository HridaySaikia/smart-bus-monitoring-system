import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Live Tracking", href: "/dashboard/tracking" },
  { label: "Students", href: "/dashboard/students" },
  { label: "Alerts", href: "/dashboard/alerts" },
  { label: "Device Status", href: "/dashboard/device-status" },
  { label: "Logs", href: "/dashboard/logs" },
];

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-white/10 bg-slate-950 md:block">
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/20 text-lg font-bold text-blue-400">
            SB
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Smart Bus System
            </h2>
            <p className="text-sm text-slate-400">Safety Monitoring Panel</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2 px-4 py-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/5 hover:text-white"
          >
            <span className="mr-3 h-2 w-2 rounded-full bg-slate-600 transition group-hover:bg-blue-400" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-4 pb-6">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <p className="text-sm font-semibold text-emerald-400">
            System Status
          </p>
          <p className="mt-1 text-sm text-slate-300">
            All primary modules are operational.
          </p>
        </div>
      </div>
    </aside>
  );
}