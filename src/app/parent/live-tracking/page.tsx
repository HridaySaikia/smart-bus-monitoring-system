"use client";

import "leaflet/dist/leaflet.css";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import dynamic from "next/dynamic";

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
};

export default function ParentLiveTrackingPage() {

  const [buses, setBuses] =
    useState<Bus[]>([]);

  const [mounted, setMounted] =
    useState(false);

  const [expandedBus, setExpandedBus] =
    useState<number | null>(null);

  useEffect(() => {

    setMounted(true);

  }, []);

  // FIX FOR VERCEL SSR ERROR
  const customIcon = useMemo(() => {

    if (
      typeof window === "undefined"
    )
      return null;

    const L = require("leaflet");

    return new L.Icon({
      iconUrl: "/bus-marker.png",

      iconSize: [46, 46],

      iconAnchor: [23, 46],

      popupAnchor: [0, -42],
    });

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

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black p-4 text-white">

      <div className="mx-auto max-w-7xl space-y-6">

        {/* HEADER */}

        <div>

          <h1 className="text-4xl font-bold">
            Parent Live Bus Tracking
          </h1>

          <p className="mt-2 text-slate-400">
            Track your child’s bus
            in real-time
          </p>

        </div>

        {/* MAIN SECTION */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* MAP */}

          <div className="overflow-hidden rounded-3xl border border-white/10 lg:col-span-2">

            <MapContainer
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
                  icon={
                    customIcon ||
                    undefined
                  }
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
                        {bus.speed.toFixed(
                          2
                        )}
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

          {/* BUS DETAILS */}

          <div className="max-h-[80vh] space-y-4 overflow-y-auto pr-1">

            {buses.map((bus) => {

              const isExpanded =
                expandedBus === bus.id;

              return (

                <div
                  key={bus.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 transition-all duration-300"
                >

                  {/* HEADER */}

                  <button
                    onClick={() =>
                      setExpandedBus(
                        isExpanded
                          ? null
                          : bus.id
                      )
                    }
                    className="flex w-full items-center justify-between p-5 text-left"
                  >

                    <div>

                      <h2 className="text-lg font-semibold text-white">
                        🚌 {bus.busName}
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        {bus.routeName}
                      </p>

                    </div>

                    <div
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        bus.status ===
                        "Moving"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {bus.status}
                    </div>

                  </button>

                  {/* DROPDOWN DETAILS */}

                  {isExpanded && (

                    <div className="border-t border-white/5 px-5 pb-5">

                      <div className="mt-4 grid gap-3">

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
                            Speed
                          </p>

                          <p className="text-sm font-semibold text-blue-400">
                            {bus.speed.toFixed(
                              2
                            )}
                            {" "}
                            km/h
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

              );
            })}

          </div>

        </div>

      </div>

    </main>
  );
}