"use client";

import { useEffect, useState } from "react";
import {
  BusFront,
  Battery,
  Gauge,
  Radio,
  TrendingUp,
} from "lucide-react";

type Bus = {
  id: number;
  deviceId: number;
  latitude: number;
  longitude: number;
  speed: number;
  status: string;
  battery: number;
  fixTime: string;
};

export default function AdminDashboardPage() {
  const [buses, setBuses] = useState<Bus[]>([]);

  const fetchLiveBuses = async () => {
    try {
      const response = await fetch("/api/live-traccar", {
        cache: "no-store",
      });

      const data = await response.json();

      setBuses(data.buses || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLiveBuses();

    const interval = setInterval(fetchLiveBuses, 5000);

    return () => clearInterval(interval);
  }, []);

  const movingBuses = buses.filter(
    (bus) => bus.status === "Moving"
  ).length;

  const stoppedBuses = buses.filter(
    (bus) => bus.status === "Stopped"
  ).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-[#081120] to-slate-950 p-6 text-white">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* HEADER */}

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Smart Bus Monitoring & Student Safety System
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            <Radio className="h-4 w-4" />
            System Operational
          </div>
        </div>

        {/* STATS */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          {/* CARD */}

          <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/5">

            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Total Buses
              </p>

              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                <BusFront className="h-5 w-5" />
              </div>
            </div>

            <h2 className="mt-5 text-4xl font-bold text-white">
              {buses.length}
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              Registered GPS buses
            </p>
          </div>

          {/* MOVING */}

          <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-green-500/30 hover:bg-green-500/5">

            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Moving Buses
              </p>

              <div className="rounded-xl bg-green-500/10 p-3 text-green-400">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>

            <h2 className="mt-5 text-4xl font-bold text-green-400">
              {movingBuses}
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              Currently active on route
            </p>
          </div>

          {/* STOPPED */}

          <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/5">

            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Stopped Buses
              </p>

              <div className="rounded-xl bg-red-500/10 p-3 text-red-400">
                <Gauge className="h-5 w-5" />
              </div>
            </div>

            <h2 className="mt-5 text-4xl font-bold text-red-400">
              {stoppedBuses}
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              Idle or parked buses
            </p>
          </div>

          {/* DEVICES */}

          <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-yellow-500/30 hover:bg-yellow-500/5">

            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Active Devices
              </p>

              <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-400">
                <Battery className="h-5 w-5" />
              </div>
            </div>

            <h2 className="mt-5 text-4xl font-bold text-yellow-400">
              {buses.length}
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              GPS trackers online
            </p>
          </div>
        </div>

        {/* LIVE STATUS */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Live Bus Status
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Real-time tracking updates
              </p>
            </div>
          </div>

          <div className="grid gap-4">

            {buses.map((bus) => (

              <div
                key={bus.id}
                className="rounded-3xl border border-white/10 bg-slate-900/40 p-5 transition-all duration-300 hover:border-blue-500/20 hover:bg-slate-900/70"
              >

                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                  {/* LEFT */}

                  <div className="min-w-[240px]">
                    <h3 className="text-xl font-semibold text-white">
                      🚌 BUS #{bus.deviceId}
                    </h3>

                    <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
                      Last Updated
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      {new Date(
                        bus.fixTime
                      ).toLocaleTimeString()}
                    </p>
                  </div>

                  {/* RIGHT */}

                  <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 xl:max-w-3xl">

                    {/* STATUS */}

                    <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
                      <p className="text-xs text-slate-500">
                        Status
                      </p>

                      <h4
                        className={`mt-3 text-xl font-semibold ${
                          bus.status === "Moving"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {bus.status}
                      </h4>
                    </div>

                    {/* SPEED */}

                    <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
                      <p className="text-xs text-slate-500">
                        Speed
                      </p>

                      <h4 className="mt-3 text-xl font-semibold text-blue-400">
                        {Math.round(bus.speed)} km/h
                      </h4>
                    </div>

                    {/* BATTERY */}

                    <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
                      <p className="text-xs text-slate-500">
                        Battery
                      </p>

                      <h4 className="mt-3 text-xl font-semibold text-yellow-400">
                        {bus.battery}%
                      </h4>
                    </div>

                    {/* GPS */}

                    <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
                      <p className="text-xs text-slate-500">
                        GPS
                      </p>

                      <h4 className="mt-3 text-xl font-semibold text-purple-400">
                        Active
                      </h4>
                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </main>
  );
}