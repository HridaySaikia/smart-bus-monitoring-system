"use client";

import { useState } from "react";

export default function AddBusPage() {
  const [formData, setFormData] = useState({
    busId: "",
    busName: "",
    driverName: "",
    conductorName: "",
    routeName: "",
    deviceId: "",
    status: "Active",
  });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "/api/buses",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...formData,
            deviceId: Number(
              formData.deviceId
            ),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Bus Added Successfully");

        setFormData({
          busId: "",
          busName: "",
          driverName: "",
          conductorName: "",
          routeName: "",
          deviceId: "",
          status: "Active",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);

      alert("Something went wrong");
    }
  };

  return (
    <main className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Add New Bus
        </h1>

        <p className="mt-2 text-slate-400">
          Register buses for GPS tracking
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl border border-white/10 bg-[#111827] p-6"
      >
        <input
          type="text"
          placeholder="Bus ID (Example: BUS-01)"
          value={formData.busId}
          onChange={(e) =>
            setFormData({
              ...formData,
              busId: e.target.value,
            })
          }
          className="w-full rounded-2xl bg-black p-4 text-white outline-none"
        />

        <input
          type="text"
          placeholder="Bus Name"
          value={formData.busName}
          onChange={(e) =>
            setFormData({
              ...formData,
              busName: e.target.value,
            })
          }
          className="w-full rounded-2xl bg-black p-4 text-white outline-none"
        />

        <input
          type="text"
          placeholder="Driver Name"
          value={formData.driverName}
          onChange={(e) =>
            setFormData({
              ...formData,
              driverName: e.target.value,
            })
          }
          className="w-full rounded-2xl bg-black p-4 text-white outline-none"
        />

        <input
          type="text"
          placeholder="Conductor Name"
          value={formData.conductorName}
          onChange={(e) =>
            setFormData({
              ...formData,
              conductorName:
                e.target.value,
            })
          }
          className="w-full rounded-2xl bg-black p-4 text-white outline-none"
        />

        <input
          type="text"
          placeholder="Route Name"
          value={formData.routeName}
          onChange={(e) =>
            setFormData({
              ...formData,
              routeName:
                e.target.value,
            })
          }
          className="w-full rounded-2xl bg-black p-4 text-white outline-none"
        />

        <input
          type="number"
          placeholder="Traccar Device ID"
          value={formData.deviceId}
          onChange={(e) =>
            setFormData({
              ...formData,
              deviceId: e.target.value,
            })
          }
          className="w-full rounded-2xl bg-black p-4 text-white outline-none"
        />

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value,
            })
          }
          className="w-full rounded-2xl bg-black p-4 text-white outline-none"
        >
          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>

        <button
          type="submit"
          className="h-14 rounded-2xl bg-blue-600 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
        >
          Add Bus
        </button>
      </form>
    </main>
  );
}