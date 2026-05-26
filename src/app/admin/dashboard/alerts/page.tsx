"use client";

import {
  AlertTriangle,
  Info,
  ShieldCheck,
  Siren,
} from "lucide-react";

import useAlerts from "@/hooks/useAlerts";

const alertStyleMap = {
  Warning: {
    icon: AlertTriangle,
    badge:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
  },

  Info: {
    icon: Info,
    badge:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
  },

  Success: {
    icon: ShieldCheck,
    badge:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },

  Critical: {
    icon: Siren,
    badge:
      "border-red-500/20 bg-red-500/10 text-red-400",
  },
} as const;

export default function AlertsPage() {
  const { alerts, loading } = useAlerts();

  const criticalCount = alerts.filter(
    (alert) =>
      alert.severity === "Critical"
  ).length;

  const warningCount = alerts.filter(
    (alert) =>
      alert.severity === "Warning"
  ).length;

  const infoCount = alerts.filter(
    (alert) =>
      alert.severity === "Info"
  ).length;

  const resolvedCount =
    alerts.filter(
      (alert) => alert.resolved
    ).length;

  return (
    <main className="min-h-screen bg-[#020817] p-6 text-white">

      <div className="space-y-6">

        {/* HEADER */}

        <section>

          <h2 className="text-4xl font-bold tracking-tight text-white">
            Alerts
          </h2>

          <p className="mt-2 text-slate-400">
            Safety, GPS, motion and
            system-generated alert events.
          </p>

        </section>

        {/* TOP STATS */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl border border-red-500/10 bg-[#071226]/80 p-5 backdrop-blur-xl">

            <p className="text-sm text-slate-400">
              Critical Alerts
            </p>

            <h2 className="mt-3 text-4xl font-bold text-red-400">
              {loading
                ? "-"
                : criticalCount}
            </h2>

          </div>

          <div className="rounded-3xl border border-amber-500/10 bg-[#071226]/80 p-5 backdrop-blur-xl">

            <p className="text-sm text-slate-400">
              Warnings
            </p>

            <h2 className="mt-3 text-4xl font-bold text-amber-400">
              {loading
                ? "-"
                : warningCount}
            </h2>

          </div>

          <div className="rounded-3xl border border-blue-500/10 bg-[#071226]/80 p-5 backdrop-blur-xl">

            <p className="text-sm text-slate-400">
              Info Events
            </p>

            <h2 className="mt-3 text-4xl font-bold text-blue-400">
              {loading
                ? "-"
                : infoCount}
            </h2>

          </div>

          <div className="rounded-3xl border border-emerald-500/10 bg-[#071226]/80 p-5 backdrop-blur-xl">

            <p className="text-sm text-slate-400">
              Resolved
            </p>

            <h2 className="mt-3 text-4xl font-bold text-emerald-400">
              {loading
                ? "-"
                : resolvedCount}
            </h2>

          </div>

        </div>

        {/* ALERT LIST */}

        <div className="rounded-3xl border border-white/10 bg-[#071226]/80 p-6 backdrop-blur-xl">

          {/* TABLE HEADER */}

          <div className="hidden grid-cols-5 gap-4 border-b border-white/10 pb-4 text-sm font-semibold text-slate-400 md:grid">

            <div>Alert</div>

            <div>Type</div>

            <div>Severity</div>

            <div>Bus ID</div>

            <div>Time</div>

          </div>

          {/* ALERTS */}

          <div className="mt-4 space-y-3">

            {loading ? (

              <div className="rounded-2xl border border-white/10 bg-[#020817] p-4 text-sm text-slate-400">
                Loading alerts...
              </div>

            ) : alerts.length === 0 ? (

              <div className="rounded-2xl border border-white/10 bg-[#020817] p-4 text-sm text-slate-400">
                No alerts found.
              </div>

            ) : (

              alerts.map((alert, index) => {

                const style =
                  alertStyleMap[
                    (alert.severity as keyof typeof alertStyleMap) ||
                      "Info"
                  ] ||
                  alertStyleMap.Info;

                const Icon =
                  style.icon;

                return (

                  <div
                    key={
                      alert._id ??
                      index
                    }
                    className="grid gap-4 rounded-2xl border border-white/10 bg-[#020817]/80 p-4 transition-all hover:border-blue-500/30 hover:bg-[#081427] md:grid-cols-5"
                  >

                    {/* ALERT */}

                    <div>

                      <p className="text-xs text-slate-500 md:hidden">
                        Alert
                      </p>

                      <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-white/5 p-2">

                          <Icon className="h-4 w-4 text-white" />

                        </div>

                        <p className="font-medium text-white">
                          {
                            alert.message
                          }
                        </p>

                      </div>

                    </div>

                    {/* TYPE */}

                    <div>

                      <p className="text-xs text-slate-500 md:hidden">
                        Type
                      </p>

                      <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
                        {alert.type}
                      </div>

                    </div>

                    {/* SEVERITY */}

                    <div>

                      <p className="text-xs text-slate-500 md:hidden">
                        Severity
                      </p>

                      <div
                        className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${style.badge}`}
                      >
                        {
                          alert.severity
                        }
                      </div>

                    </div>

                    {/* BUS */}

                    <div>

                      <p className="text-xs text-slate-500 md:hidden">
                        Bus ID
                      </p>

                      <p className="font-medium text-cyan-400">
                        {alert.busId}
                      </p>

                    </div>

                    {/* TIME */}

                    <div>

                      <p className="text-xs text-slate-500 md:hidden">
                        Time
                      </p>

                      <p className="text-sm text-slate-300">
                        {new Date(
                          alert.time
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>

                );
              })

            )}

          </div>

        </div>

      </div>

    </main>
  );
}