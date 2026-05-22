"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MobileGpsPage() {
  const searchParams = useSearchParams();

  const busId = searchParams.get("busId") || "BUS-UNKNOWN";

  const [tracking, setTracking] = useState(false);
  const [status, setStatus] = useState("Tracking not started");

  const sendLocation = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const response = await fetch("/api/bus-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          busId,
          status: "Running",
          location: {
            latitude,
            longitude,
            currentLocation: "Live mobile GPS location",
          },
          studentsOnboard: 31,
          emergencyStatus: "Normal",
          deviceHealth: "Stable",
          speed: "Live",
          nextStop: "Updating...",
          eta: "Updating...",
        }),
      });

      if (response.ok) {
        setStatus("Location sent successfully");
      } else {
        setStatus("Failed to send location");
      }
    } catch (error) {
      console.error(error);
      setStatus("Server error");
    }
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setStatus("GPS not supported");
      return;
    }

    setStatus("Requesting GPS...");
    setTracking(true);

    navigator.geolocation.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        sendLocation(latitude, longitude);
      },
      (error) => {
        console.error(error);
        setStatus("Location permission denied");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );
  };

  const stopTracking = () => {
    setTracking(false);
    setStatus("Tracking stopped");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-slate-950 to-background p-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl">
        <h1 className="text-3xl font-bold text-white">
          Bus GPS Tracker
        </h1>

        <p className="mt-2 text-muted-foreground">
          Tracking for:
        </p>

        <div className="mt-3 rounded-xl bg-background/60 p-4">
          <p className="font-semibold text-blue-400">
            {busId}
          </p>
        </div>

        <div className="mt-5 rounded-xl bg-background/60 p-4">
          <p className="text-sm text-muted-foreground">
            Status
          </p>

          <p className="mt-2 font-semibold text-white">
            {status}
          </p>
        </div>

        {!tracking ? (
          <button
            onClick={startTracking}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Start Tracking
          </button>
        ) : (
          <button
            onClick={stopTracking}
            className="mt-6 w-full rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            Stop Tracking
          </button>
        )}
      </div>
    </main>
  );
}