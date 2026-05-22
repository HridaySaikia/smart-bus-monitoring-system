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
  { ssr: false }
);

const TileLayer = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.TileLayer
    ),
  { ssr: false }
);

const Marker = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.Marker
    ),
  { ssr: false }
);

const Popup = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.Popup
    ),
  { ssr: false }
);

const customIcon = new L.Icon({
  iconUrl: "/bus-marker.png",

  iconSize: [50, 50],

  iconAnchor: [25, 50],

  popupAnchor: [0, -45],
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
};

export default function ParentLiveTrackingPage() {
  const [buses, setBuses] = useState<Bus[]>([]);

  const fetchLiveBuses = async () => {
    try {
      const response = await fetch(
        "/api/live-traccar",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      setBuses(data.buses || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLiveBuses();

    const interval = setInterval(
      fetchLiveBuses,
      5000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black p-4 text-white">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-4xl font-bold">
            Parent Live Bus Tracking
          </h1>

          <p className="mt-2 text-slate-400">
            Track your child’s bus in real-time
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="overflow-hidden rounded-3xl border border-white/10 lg:col-span-2">
            <MapContainer
              center={[26.7001975, 92.8356762]}
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
                <Marker
                  key={bus.id}
                  position={[
                    bus.latitude,
                    bus.longitude,
                  ]}
                  icon={customIcon}
                >
                  <Popup>
                    <div className="space-y-1">
                      <h2 className="font-bold">
                        🚌 BUS #{bus.deviceId}
                      </h2>

                      <p>Status: {bus.status}</p>

                      <p>
                        Speed: {bus.speed} km/h
                      </p>

                      <p>
                        Battery: {bus.battery}%
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="space-y-4">
            {buses.map((bus) => (
              <div
                key={bus.id}
                className="rounded-3xl border border-white/10 bg-neutral-950 p-5"
              >
                <h2 className="text-2xl font-bold">
                  🚌 BUS #{bus.deviceId}
                </h2>

                <div className="mt-4 space-y-2 text-slate-300">
                  <p>
                    Status:
                    <span className="ml-2 font-semibold text-green-400">
                      {bus.status}
                    </span>
                  </p>

                  <p>
                    Speed:
                    <span className="ml-2">
                      {bus.speed} km/h
                    </span>
                  </p>

                  <p>
                    Battery:
                    <span className="ml-2">
                      {bus.battery}%
                    </span>
                  </p>

                  <p>
                    Latitude:
                    <span className="ml-2">
                      {bus.latitude}
                    </span>
                  </p>

                  <p>
                    Longitude:
                    <span className="ml-2">
                      {bus.longitude}
                    </span>
                  </p>

                  <p>
                    Last Update:
                    <span className="ml-2">
                      {new Date(
                        bus.fixTime
                      ).toLocaleTimeString()}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}