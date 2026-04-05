const stats = [
  {
    title: "Bus Status",
    value: "Running",
    subtext: "Updated 1 min ago",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  {
    title: "Students Onboard",
    value: "28",
    subtext: "RFID count active",
    color: "text-blue-400",
    dot: "bg-blue-400",
  },
  {
    title: "Emergency Status",
    value: "Normal",
    subtext: "No active trigger",
    color: "text-amber-400",
    dot: "bg-amber-400",
  },
  {
    title: "Device Health",
    value: "Stable",
    subtext: "All modules responding",
    color: "text-violet-400",
    dot: "bg-violet-400",
  },
];

const recentLogs = [
  { title: "RFID Scan Detected", detail: "Student ID 204 entered the bus" },
  { title: "GPS Updated", detail: "Location refreshed successfully" },
  { title: "MPU6050 Active", detail: "Motion sensor data received" },
];

const alerts = [
  { level: "Warning", message: "GPS signal temporarily weak" },
  { level: "Info", message: "Routine emergency button test recorded" },
  { level: "Success", message: "RFID module synced normally" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Overview
        </h2>
        <p className="mt-2 text-slate-400">
          Main operational view of the smart bus monitoring platform.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:bg-white/[0.07]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-400">{item.title}</p>
              <span className={`h-3 w-3 rounded-full ${item.dot}`} />
            </div>

            <p className={`mt-4 text-3xl font-bold ${item.color}`}>
              {item.value}
            </p>

            <p className="mt-2 text-sm text-slate-500">{item.subtext}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl xl:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              Live Tracking View
            </h3>
            <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
              Live GPS
            </div>
          </div>

          <div className="mt-5 flex h-80 items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 text-slate-500">
            Interactive map will be integrated here
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-white">Recent Alerts</h3>

          <div className="mt-5 space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
              >
                <p className="text-sm font-semibold text-slate-200">
                  {alert.level}
                </p>
                <p className="mt-1 text-sm text-slate-400">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-white">Recent Activity</h3>

          <div className="mt-5 space-y-4">
            {recentLogs.map((log, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
              >
                <p className="font-medium text-slate-100">{log.title}</p>
                <p className="mt-1 text-sm text-slate-400">{log.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-white">System Summary</h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-900/70 p-4">
              <p className="text-sm text-slate-400">Current Route</p>
              <p className="mt-2 text-lg font-semibold text-white">
                Tezpur Main Route
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/70 p-4">
              <p className="text-sm text-slate-400">Next Stop</p>
              <p className="mt-2 text-lg font-semibold text-white">
                University Gate
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/70 p-4">
              <p className="text-sm text-slate-400">RFID Reader</p>
              <p className="mt-2 text-lg font-semibold text-emerald-400">
                Connected
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/70 p-4">
              <p className="text-sm text-slate-400">GPS Module</p>
              <p className="mt-2 text-lg font-semibold text-blue-400">
                Active
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}