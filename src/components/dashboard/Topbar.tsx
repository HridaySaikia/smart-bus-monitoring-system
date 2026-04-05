export default function Topbar() {
  return (
    <header className="border-b border-white/10 bg-slate-950/70 px-6 py-5 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Smart Bus Monitoring Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Real-time tracking, RFID logs, alerts, and device health
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
            ● System Online
          </div>

          <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Bus ID: BUS-01
          </div>
        </div>
      </div>
    </header>
  );
}