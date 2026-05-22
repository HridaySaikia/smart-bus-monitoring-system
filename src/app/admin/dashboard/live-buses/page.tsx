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

export default function LiveBusesPage() {
  const [buses, setBuses] = useState<Bus[]>(
    []
  );

  const fetchLiveBuses = async () => {
    try {
      const response = await fetch(
        "/api/live-traccar"
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
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Live Bus Tracking
        </h1>

        <p className="text-slate-400">
          Monitor buses in real-time
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10">
        <MapContainer
          center={[26.7002597, 92.8352613]}
          zoom={16}
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
                    🚌 Device #{bus.deviceId}
                  </h2>

                  <p>
                    Status: {bus.status}
                  </p>

                  <p>
                    Speed: {bus.speed}
                  </p>

                  <p>
                    Battery: {bus.battery}%
                  </p>

                  <p>
                    Lat: {bus.latitude}
                  </p>

                  <p>
                    Lng: {bus.longitude}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </main>
  );
}