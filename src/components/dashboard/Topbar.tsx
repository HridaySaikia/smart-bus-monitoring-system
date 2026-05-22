import { Bell, BusFront, ShieldCheck } from "lucide-react";

import MobileSidebar from "@/components/dashboard/MobileSidebar";
import { Badge } from "@/components/ui/badge";

export default function Topbar() {
  return (
    <header className="border-b border-border bg-background/80 px-4 py-5 backdrop-blur-xl sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <MobileSidebar />

          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Smart Bus Monitoring Dashboard
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Real-time tracking, RFID logs, alerts, and device health
            </p>
          </div>
        </div>

        <div className="hidden flex-wrap items-center gap-3 md:flex">
          <Badge className="border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-emerald-400 hover:bg-emerald-500/10">
            <ShieldCheck className="mr-2 h-4 w-4" />
            System Online
          </Badge>

          <Badge className="border-blue-500/20 bg-blue-500/10 px-4 py-2 text-blue-400 hover:bg-blue-500/10">
            <BusFront className="mr-2 h-4 w-4" />
            Bus ID: BUS-01
          </Badge>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-slate-300">
            <Bell className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
}