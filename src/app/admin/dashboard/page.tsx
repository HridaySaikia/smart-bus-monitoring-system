"use client";

import { useEffect, useState } from "react";

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

  const [buses, setBuses] =
    useState<Bus[]>([]);

  const fetchLiveBuses =
    async () => {

      try {

        const response =
          await fetch(
            "/api/live-traccar",
            {
              cache: "no-store",
            }
          );

        const data =
          await response.json();

        setBuses(
          data.buses || []
        );

      } catch (error) {

        console.error(error);
      }
    };

  useEffect(() => {

    fetchLiveBuses();

    const interval =
      setInterval(
        fetchLiveBuses,
        5000
      );

    return () =>
      clearInterval(interval);

  }, []);

  const movingBuses =
    buses.filter(
      (bus) =>
        bus.status === "Moving"
    ).length;

  const stoppedBuses =
    buses.filter(
      (bus) =>
        bus.status === "Stopped"
    ).length;

  return (

    <main className="min-h-screen bg-black p-6 text-white">

      <div className="mx-auto max-w-7xl space-y-8">

        {/* HEADER */}

        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Smart Bus Monitoring & Student Safety
          </p>
        </div>

        {/* TOP STATS */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-neutral-950 p-5">

            <p className="text-sm text-slate-500">
              Total Buses
            </p>

            <h2 className="mt-3 text-4xl font-bold text-blue-400">
              {buses.length}
            </h2>

          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-950 p-5">

            <p className="text-sm text-slate-500">
              Moving Buses
            </p>

            <h2 className="mt-3 text-4xl font-bold text-green-400">
              {movingBuses}
            </h2>

          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-950 p-5">

            <p className="text-sm text-slate-500">
              Stopped Buses
            </p>

            <h2 className="mt-3 text-4xl font-bold text-red-400">
              {stoppedBuses}
            </h2>

          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-950 p-5">

            <p className="text-sm text-slate-500">
              Active GPS Devices
            </p>

            <h2 className="mt-3 text-4xl font-bold text-yellow-400">
              {buses.length}
            </h2>

          </div>

        </div>

        {/* LIVE BUS STATUS */}

        <div className="rounded-2xl border border-white/10 bg-neutral-950 p-6">

          <h2 className="text-2xl font-semibold tracking-tight">
            Live Bus Status
          </h2>

          <div className="mt-6 grid gap-4">

            {buses.map((bus) => (

              <div
                key={bus.id}
                className="rounded-2xl border border-white/10 bg-black p-5"
              >

                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                  {/* LEFT SIDE */}

                  <div className="min-w-[220px]">

                    <h3 className="text-lg font-semibold tracking-tight text-white">
                      🚌 BUS #{bus.deviceId}
                    </h3>

                    <p className="mt-2 text-xs text-slate-500">
                      Last Updated
                    </p>

                    <p className="text-sm text-slate-300">
                      {new Date(
                        bus.fixTime
                      ).toLocaleTimeString()}
                    </p>

                  </div>

                  {/* RIGHT SIDE */}

                  <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4 xl:max-w-3xl">

                    {/* STATUS */}

                    <div className="flex h-[95px] flex-col justify-between rounded-2xl border border-white/5 bg-neutral-900 px-4 py-3">

                      <p className="text-xs text-slate-500">
                        Status
                      </p>

                      <h4
                        className={`text-xl font-semibold ${
                          bus.status === "Moving"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {bus.status}
                      </h4>

                    </div>

                    {/* SPEED */}

                    <div className="flex h-[95px] flex-col justify-between rounded-2xl border border-white/5 bg-neutral-900 px-4 py-3">

                      <p className="text-xs text-slate-500">
                        Speed
                      </p>

                      <h4 className="text-xl font-semibold text-blue-400">
                        {Math.round(
                          bus.speed
                        )} km/h
                      </h4>

                    </div>

                    {/* BATTERY */}

                    <div className="flex h-[95px] flex-col justify-between rounded-2xl border border-white/5 bg-neutral-900 px-4 py-3">

                      <p className="text-xs text-slate-500">
                        Battery
                      </p>

                      <h4 className="text-xl font-semibold text-yellow-400">
                        {bus.battery}%
                      </h4>

                    </div>

                    {/* GPS */}

                    <div className="flex h-[95px] flex-col justify-between rounded-2xl border border-white/5 bg-neutral-900 px-4 py-3">

                      <p className="text-xs text-slate-500">
                        GPS
                      </p>

                      <h4 className="text-xl font-semibold text-purple-400">
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