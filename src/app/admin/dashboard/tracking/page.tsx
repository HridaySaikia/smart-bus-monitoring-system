"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

import L from "leaflet";

const MapContainer = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.MapContainer
    ),
  {
    ssr: false,
  }
);

const TileLayer = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.TileLayer
    ),
  {
    ssr: false,
  }
);

const Popup = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.Popup
    ),
  {
    ssr: false,
  }
);

const DriftMarker = dynamic(
  () => import("react-leaflet-drift-marker"),
  {
    ssr: false,
  }
);

const busIcon = new L.Icon({
  iconUrl: "/bus-marker.png",

  iconSize: [42, 42],

  iconAnchor: [21, 42],

  popupAnchor: [0, -40],
});

type Bus = {
  id: number;
  deviceId: number;
  latitude: number;
  longitude: number;
  speed: number;
  status: string;
  battery: number;
  fixTime: string;

  busName?: string;
  busId?: string;
  driverName?: string;
  routeName?: string;
  conductorName?: string;
};

export default function TrackingPage() {

  const [buses, setBuses] =
    useState<Bus[]>([]);

  const [mounted, setMounted] =
    useState(false);

  const [expandedBus, setExpandedBus] =
    useState<number | null>(null);

  useEffect(() => {

    setMounted(true);

  }, []);

  const fetchLiveBuses = async () => {

    try {

      const response = await fetch(
        "/api/live-traccar",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {

        throw new Error(
          "Failed to fetch"
        );
      }

      const data =
        await response.json();

      setBuses(data.buses || []);

    } catch (error) {

      console.error(
        "LIVE TRACKING ERROR:",
        error
      );
    }
  };

  useEffect(() => {

    fetchLiveBuses();

    const interval =
      setInterval(
        fetchLiveBuses,
        3000
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

  if (!mounted) {

    return null;
  }

  return (

    <main className="space-y-6">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-bold text-white">
          Smart Bus Live Tracking
        </h1>

        <p className="mt-2 text-slate-400">
          Real-time GPS monitoring using Traccar
        </p>

      </div>

      {/* TOP STATS */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <p className="text-sm text-slate-400">
            Total Buses
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {buses.length}
          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <p className="text-sm text-slate-400">
            Moving Buses
          </p>

          <h2 className="mt-3 text-3xl font-bold text-green-400">
            {movingBuses}
          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <p className="text-sm text-slate-400">
            Stopped Buses
          </p>

          <h2 className="mt-3 text-3xl font-bold text-red-400">
            {stoppedBuses}
          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <p className="text-sm text-slate-400">
            Refresh Rate
          </p>

          <h2 className="mt-3 text-3xl font-bold text-blue-400">
            3s
          </h2>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* MAP */}

        <div className="overflow-hidden rounded-3xl border border-white/10 lg:col-span-2">

          <MapContainer
            key="bus-map"
            center={[
              26.7001975,
              92.8356762,
            ]}
            zoom={15}
            style={{
              height: "80vh",
              width: "100%",
            }}
          >

            <TileLayer
              attribution="OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {buses.map((bus) => (

              <DriftMarker
                key={bus.id}
                position={[
                  bus.latitude,
                  bus.longitude,
                ]}
                duration={3000}
                icon={busIcon}
              >

                <Popup>

                  <div className="space-y-2">

                    <h2 className="text-lg font-bold">
                      🚌 {bus.busName}
                    </h2>

                    <p>
                      Bus ID:
                      {" "}
                      {bus.busId}
                    </p>

                    <p>
                      Driver:
                      {" "}
                      {bus.driverName}
                    </p>

                    <p>
                      Route:
                      {" "}
                      {bus.routeName}
                    </p>

                    <p>
                      Status:
                      {" "}
                      {bus.status}
                    </p>

                    <p>
                      Speed:
                      {" "}
                      {bus.speed.toFixed(2)}
                      {" "}
                      km/h
                    </p>

                    <p>
                      Battery:
                      {" "}
                      {bus.battery}%
                    </p>

                    <p className="text-xs text-slate-500">
                      Updated:
                    </p>

                    <p className="text-xs">
                      {new Date(
                        bus.fixTime
                      ).toLocaleString()}
                    </p>

                  </div>

                </Popup>

              </DriftMarker>

            ))}

          </MapContainer>

        </div>

        {/* SIDE PANEL */}

        <div className="max-h-[80vh] space-y-4 overflow-y-auto pr-2">

          {buses.map((bus) => (

            <div
              key={bus.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827] transition-all duration-300"
            >

              {/* HEADER */}

              <button
                onClick={() => {

                  setExpandedBus(
                    expandedBus === bus.id
                      ? null
                      : bus.id
                  );

                }}
                className="flex w-full items-center justify-between px-5 py-4"
              >

                <div>

                  <h2 className="text-base font-semibold text-white">
                    🚌 {bus.busName}
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    {bus.routeName}
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      bus.status === "Moving"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {bus.status}
                  </span>

                  <div
                    className={`text-white transition-transform duration-300 ${
                      expandedBus === bus.id
                        ? "rotate-180"
                        : ""
                    }`}
                  >
                    ▼
                  </div>

                </div>

              </button>

              {/* DETAILS */}

              {expandedBus === bus.id && (

                <div className="border-t border-white/10 px-5 pb-5 pt-4">

                  <div className="grid gap-3">

                    <div className="flex items-center justify-between rounded-xl bg-black/30 px-4 py-3">

                      <p className="text-sm text-slate-400">
                        Bus ID
                      </p>

                      <p className="text-sm font-semibold text-white">
                        {bus.busId}
                      </p>

                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-black/30 px-4 py-3">

                      <p className="text-sm text-slate-400">
                        Driver
                      </p>

                      <p className="text-sm font-semibold text-white">
                        {bus.driverName}
                      </p>

                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-black/30 px-4 py-3">

                      <p className="text-sm text-slate-400">
                        Route
                      </p>

                      <p className="text-sm font-semibold text-white">
                        {bus.routeName}
                      </p>

                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-black/30 px-4 py-3">

                      <p className="text-sm text-slate-400">
                        Speed
                      </p>

                      <p className="text-sm font-semibold text-blue-400">
                        {bus.speed.toFixed(2)} km/h
                      </p>

                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-black/30 px-4 py-3">

                      <p className="text-sm text-slate-400">
                        Battery
                      </p>

                      <p className="text-sm font-semibold text-yellow-400">
                        {bus.battery}%
                      </p>

                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-black/30 px-4 py-3">

                      <p className="text-sm text-slate-400">
                        Updated
                      </p>

                      <p className="text-sm font-semibold text-white">
                        {new Date(
                          bus.fixTime
                        ).toLocaleTimeString()}
                      </p>

                    </div>

                  </div>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}