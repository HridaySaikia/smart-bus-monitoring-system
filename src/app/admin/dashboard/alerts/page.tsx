"use client";

import {
  AlertTriangle,
  Info,
  ShieldCheck,
  Siren,
} from "lucide-react";

import useAlerts from "@/hooks/useAlerts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const alertStyleMap = {
  Warning: {
    icon: AlertTriangle,
    badge: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  },
  Info: {
    icon: Info,
    badge: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  },
  Success: {
    icon: ShieldCheck,
    badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },
  Critical: {
    icon: Siren,
    badge: "border-red-500/20 bg-red-500/10 text-red-400",
  },
} as const;

export default function AlertsPage() {
  const { alerts, loading } = useAlerts();

  const criticalCount = alerts.filter(
    (alert) => alert.severity === "Critical"
  ).length;

  const warningCount = alerts.filter(
    (alert) => alert.severity === "Warning"
  ).length;

  const infoCount = alerts.filter(
    (alert) => alert.severity === "Info"
  ).length;

  const resolvedCount = alerts.filter((alert) => alert.resolved).length;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-white">Alerts</h2>
        <p className="mt-2 text-muted-foreground">
          Safety, motion, GPS, and system-generated alert events.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="border-border bg-card/60 backdrop-blur-xl xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Recent Alert Feed</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {loading ? (
              <div className="rounded-2xl border border-border bg-background/60 p-4 text-sm text-muted-foreground">
                Loading alerts...
              </div>
            ) : alerts.length === 0 ? (
              <div className="rounded-2xl border border-border bg-background/60 p-4 text-sm text-muted-foreground">
                No alerts found.
              </div>
            ) : (
              alerts.map((alert, index) => {
                const style =
                  alertStyleMap[
                    (alert.severity as keyof typeof alertStyleMap) || "Info"
                  ] || alertStyleMap.Info;

                const Icon = style.icon;

                return (
                  <div
                    key={alert._id ?? index}
                    className="rounded-2xl border border-border bg-background/60 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-white/5 p-2">
                          <Icon className="h-5 w-5 text-white" />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold text-foreground">
                              {alert.message}
                            </p>

                            <Badge className={style.badge}>
                              {alert.severity}
                            </Badge>

                            <Badge
                              variant="outline"
                              className="border-border text-slate-300"
                            >
                              {alert.type}
                            </Badge>

                            {alert.resolved && (
                              <Badge className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                                Resolved
                              </Badge>
                            )}
                          </div>

                          <p className="mt-2 text-sm text-muted-foreground">
                            Bus ID: {alert.busId}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs text-slate-500">
                        {new Date(alert.time).toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Alert Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-background/60 p-4">
              <p className="text-sm text-muted-foreground">Critical Alerts</p>
              <p className="mt-2 text-2xl font-bold text-red-400">
                {loading ? "-" : criticalCount}
              </p>
            </div>

            <div className="rounded-2xl bg-background/60 p-4">
              <p className="text-sm text-muted-foreground">Warnings</p>
              <p className="mt-2 text-2xl font-bold text-amber-400">
                {loading ? "-" : warningCount}
              </p>
            </div>

            <div className="rounded-2xl bg-background/60 p-4">
              <p className="text-sm text-muted-foreground">Info Events</p>
              <p className="mt-2 text-2xl font-bold text-blue-400">
                {loading ? "-" : infoCount}
              </p>
            </div>

            <div className="rounded-2xl bg-background/60 p-4">
              <p className="text-sm text-muted-foreground">Resolved Events</p>
              <p className="mt-2 text-2xl font-bold text-emerald-400">
                {loading ? "-" : resolvedCount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}