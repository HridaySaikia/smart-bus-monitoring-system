"use client";

import {
  Cpu,
  Radio,
  ShieldAlert,
  Signal,
  Tv,
  CircleDot,
} from "lucide-react";

import useDeviceStatus from "@/hooks/useDeviceStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const deviceConfig = [
  {
    key: "esp32",
    label: "ESP32 Controller",
    icon: Cpu,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    key: "gps",
    label: "GPS Module",
    icon: Signal,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    key: "rfid",
    label: "RFID Reader",
    icon: Radio,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    key: "mpu6050",
    label: "MPU6050 Sensor",
    icon: ShieldAlert,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    key: "oled",
    label: "OLED Display",
    icon: Tv,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
] as const;

function getStatusTone(status?: string) {
  const normalized = status?.toLowerCase();

  if (
    normalized === "online" ||
    normalized === "active" ||
    normalized === "connected" ||
    normalized === "operational" ||
    normalized === "monitoring"
  ) {
    return "text-emerald-400";
  }

  if (
    normalized === "warning" ||
    normalized === "weak" ||
    normalized === "standby"
  ) {
    return "text-amber-400";
  }

  if (
    normalized === "offline" ||
    normalized === "disconnected" ||
    normalized === "error"
  ) {
    return "text-red-400";
  }

  return "text-slate-300";
}

export default function DeviceStatusPage() {
  const { deviceStatus, loading } = useDeviceStatus();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Device Status
        </h2>
        <p className="mt-2 text-muted-foreground">
          Live monitoring of hardware modules connected to the bus system.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {deviceConfig.map((device) => {
          const Icon = device.icon;
          const value =
            !loading && deviceStatus
              ? deviceStatus[device.key as keyof typeof deviceStatus]
              : "Loading...";

          return (
            <Card
              key={device.key}
              className="border-border bg-card/60 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg text-white">
                    {device.label}
                  </CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Module health and connectivity
                  </p>
                </div>

                <div className={`rounded-2xl p-3 ${device.bg}`}>
                  <Icon className={`h-5 w-5 ${device.color}`} />
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-2">
                  <CircleDot className={`h-4 w-4 ${getStatusTone(String(value))}`} />
                  <p className={`text-lg font-semibold ${getStatusTone(String(value))}`}>
                    {String(value)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Card className="border-border bg-card/60 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Device Summary</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-background/60 p-4">
            <p className="text-sm text-muted-foreground">Bus ID</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {loading ? "Loading..." : deviceStatus?.busId || "BUS-01"}
            </p>
          </div>

          <div className="rounded-2xl bg-background/60 p-4">
            <p className="text-sm text-muted-foreground">Last Updated</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {loading
                ? "Loading..."
                : deviceStatus?.updatedAt
                ? new Date(deviceStatus.updatedAt).toLocaleString()
                : "N/A"}
            </p>
          </div>

          <div className="rounded-2xl bg-background/60 p-4">
            <p className="text-sm text-muted-foreground">Overall Status</p>
            <p className="mt-2 text-lg font-semibold text-emerald-400">
              {loading ? "Loading..." : "Monitoring"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}