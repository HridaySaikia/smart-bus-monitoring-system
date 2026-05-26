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
    <main className="min-h-screen bg-[#020817] p-6 text-white">

      <div className="space-y-6">

        {/* HEADER */}

        <section>

          <h2 className="text-4xl font-bold tracking-tight text-white">
            Device Status
          </h2>

          <p className="mt-2 text-slate-400">
            Live monitoring of hardware modules connected to the bus system.
          </p>

        </section>

        {/* DEVICE CARDS */}

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {deviceConfig.map((device) => {

            const Icon = device.icon;

            const value =
              !loading && deviceStatus
                ? deviceStatus[
                    device.key as keyof typeof deviceStatus
                  ]
                : "Loading...";

            return (

              <div
                key={device.key}
                className="rounded-3xl border border-white/10 bg-[#071226]/80 p-6 backdrop-blur-xl transition-all hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h3 className="text-lg font-semibold text-white">
                      {device.label}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Module health & connectivity
                    </p>

                  </div>

                  <div
                    className={`rounded-2xl p-3 ${device.bg}`}
                  >
                    <Icon
                      className={`h-5 w-5 ${device.color}`}
                    />
                  </div>

                </div>

                <div className="mt-6 flex items-center gap-3">

                  <CircleDot
                    className={`h-4 w-4 ${getStatusTone(
                      String(value)
                    )}`}
                  />

                  <p
                    className={`text-lg font-semibold ${getStatusTone(
                      String(value)
                    )}`}
                  >
                    {String(value)}
                  </p>

                </div>

              </div>

            );
          })}

        </section>

        {/* SUMMARY */}

        <div className="rounded-3xl border border-white/10 bg-[#071226]/80 p-6 backdrop-blur-xl">

          <h3 className="text-2xl font-semibold text-white">
            Device Summary
          </h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-[#020817] p-5">

              <p className="text-sm text-slate-400">
                Bus ID
              </p>

              <p className="mt-3 text-xl font-semibold text-white">
                {loading
                  ? "Loading..."
                  : deviceStatus?.busId || "BUS-01"}
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-[#020817] p-5">

              <p className="text-sm text-slate-400">
                Last Updated
              </p>

              <p className="mt-3 text-lg font-semibold text-white">
                {loading
                  ? "Loading..."
                  : deviceStatus?.updatedAt
                  ? new Date(
                      deviceStatus.updatedAt
                    ).toLocaleString()
                  : "N/A"}
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-[#020817] p-5">

              <p className="text-sm text-slate-400">
                Overall Status
              </p>

              <p className="mt-3 text-xl font-semibold text-emerald-400">
                {loading
                  ? "Loading..."
                  : "Monitoring"}
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}