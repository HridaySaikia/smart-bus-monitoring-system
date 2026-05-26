import {
  Bell,
  BusFront,
  ShieldCheck,
  Activity,
} from "lucide-react";

import MobileSidebar from "@/components/dashboard/MobileSidebar";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#020817]/80 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6">

        {/* LEFT SECTION */}

        <div className="flex items-center gap-4">

          <MobileSidebar />

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-white">
              Smart Bus Monitoring
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Real-time tracking and student safety
            </p>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div className="hidden items-center gap-3 md:flex">

          {/* SYSTEM STATUS */}

          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">

            <div className="relative flex h-3 w-3">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />

            </div>

            <div>

              <p className="text-[11px] text-slate-400">
                Bus Monitoring
              </p>

              <p className="flex items-center gap-1 text-sm font-semibold text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                Monitoring Active
              </p>

            </div>

          </div>

        

          {/* LIVE STATUS */}

          <div className="flex items-center gap-2 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3">

            <Activity className="h-4 w-4 text-cyan-400" />

            <span className="text-sm font-medium text-cyan-400">
              Live Tracking
            </span>

          </div>

          {/* NOTIFICATION BUTTON */}

          <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:bg-white/10 hover:text-white">

            <Bell className="h-5 w-5" />

          </button>

        </div>

      </div>
    </header>
  );
}