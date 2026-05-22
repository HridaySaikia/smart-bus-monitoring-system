"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function MobileGPSPage() {
  const params = useParams();

  const busId = params.busId as string;

  const [status, setStatus] = useState(
    "Tracking not started"
  );

  const startTracking = async () => {
    try {
      console.log("START BUTTON CLICKED");

      if (!navigator.geolocation) {
        setStatus("GPS not supported");
        return;
      }

      setStatus("Fetching current location...");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const latitude = position.coords.latitude;

            const longitude = position.coords.longitude;

            setStatus("Sending location...");

            const response = await fetch(
              "https://unarmored-taste-ultimatum.ngrok-free.dev/api/bus-data",
              {
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
                    currentLocation:
                      "Live mobile GPS location",
                  },

                  studentsOnboard: 31,

                  emergencyStatus: "Normal",

                  deviceHealth: "Stable",

                  speed: "Live",

                  nextStop: "Updating...",

                  eta: "Updating...",
                }),
              }
            );

            if (response.ok) {
              setStatus(
                `Location Sent Successfully`
              );
            } else {
              setStatus(
                "Server error: location not saved"
              );
            }
          } catch (error) {
            console.error(error);

            setStatus("Network error");
          }
        },

        (error) => {
          console.error(error);

          if (error.code === 1) {
            setStatus("Location permission denied");
          } else if (error.code === 2) {
            setStatus("Location unavailable");
          } else if (error.code === 3) {
            setStatus("Location timeout");
          } else {
            setStatus("GPS error");
          }
        },

        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );
    } catch (error) {
      console.error(error);

      setStatus("Tracking failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-neutral-950 p-6 shadow-2xl">
        <h1 className="text-4xl font-bold text-white">
          Bus GPS Tracker
        </h1>

        <p className="mt-4 text-zinc-400">
          Tracking for:
        </p>

        <div className="mt-2 rounded-2xl bg-black p-4 text-3xl font-bold text-blue-400">
          {busId}
        </div>

        <div className="mt-5 rounded-2xl bg-black p-4">
          <p className="text-zinc-400">Status</p>

          <p className="mt-3 break-words text-xl font-bold text-white">
            {status}
          </p>
        </div>

        <div
  onTouchStart={() => {
    alert("Button Pressed");
    startTracking();
  }}
  className="mt-6 flex w-full select-none items-center justify-center rounded-2xl bg-blue-600 py-4 text-xl font-bold text-white"
  style={{
    touchAction: "manipulation",
  }}
>
  Send Current Location
</div>
      </div>
    </main>
  );
}