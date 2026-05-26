"use client";

import { useEffect, useState } from "react";

type Bus = {
  _id: string;
  busId: string;
  busName: string;
  driverName: string;
  conductorName: string;
  routeName: string;
  deviceId: number;
  status: string;
};

export default function BusesPage() {
  const [buses, setBuses] = useState<Bus[]>([]);

  const [editingBusId, setEditingBusId] =
    useState<string | null>(null);

  const [formData, setFormData] = useState({
    busId: "",
    busName: "",
    driverName: "",
    conductorName: "",
    routeName: "",
    deviceId: "",
  });

  const fetchBuses = async () => {
    try {
      const response = await fetch("/api/buses");

      const data = await response.json();

      setBuses(data.buses || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await fetch("/api/buses", {
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
          status: "Active",
        }),
      });

      setFormData({
        busId: "",
        busName: "",
        driverName: "",
        conductorName: "",
        routeName: "",
        deviceId: "",
      });

      fetchBuses();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBus = async (
    id: string
  ) => {
    try {
      const response = await fetch(
        `/api/buses/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setBuses((prev) =>
          prev.filter(
            (bus) => bus._id !== id
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateBus = async (
    id: string
  ) => {
    try {
      const response = await fetch(
        `/api/buses/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...formData,
            deviceId: Number(
              formData.deviceId
            ),
            status: "Active",
          }),
        }
      );

      if (response.ok) {
        setBuses((prev) =>
          prev.map((bus) =>
            bus._id === id
              ? {
                  ...bus,
                  ...formData,
                  deviceId: Number(
                    formData.deviceId
                  ),
                }
              : bus
          )
        );

        setEditingBusId(null);

        setFormData({
          busId: "",
          busName: "",
          driverName: "",
          conductorName: "",
          routeName: "",
          deviceId: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#020817] p-6 text-white">

      <div className="mx-auto max-w-7xl space-y-8">

        {/* HEADER */}

        <div className="space-y-2">

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Manage Buses
          </h1>

          <p className="text-slate-400">
            Add, update and manage buses
            dynamically
          </p>

        </div>

        {/* FORM */}

        <div className="rounded-3xl border border-white/10 bg-[#071226]/80 p-8 backdrop-blur-xl shadow-2xl">

          <form
            onSubmit={(e) => {
              if (editingBusId) {
                e.preventDefault();

                updateBus(editingBusId);
              } else {
                handleSubmit(e);
              }
            }}
            className="grid gap-5 md:grid-cols-2"
          >

            <input
              type="text"
              placeholder="Bus ID"
              value={formData.busId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  busId: e.target.value,
                })
              }
              className="h-14 rounded-2xl border border-white/10 bg-[#020817] px-5 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
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
              className="h-14 rounded-2xl border border-white/10 bg-[#020817] px-5 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
            />

            <input
              type="text"
              placeholder="Driver Name"
              value={formData.driverName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  driverName:
                    e.target.value,
                })
              }
              className="h-14 rounded-2xl border border-white/10 bg-[#020817] px-5 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
            />

            <input
              type="text"
              placeholder="Conductor Name"
              value={
                formData.conductorName
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  conductorName:
                    e.target.value,
                })
              }
              className="h-14 rounded-2xl border border-white/10 bg-[#020817] px-5 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
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
              className="h-14 rounded-2xl border border-white/10 bg-[#020817] px-5 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
            />

            <input
              type="number"
              placeholder="Traccar Device ID"
              value={formData.deviceId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deviceId:
                    e.target.value,
                })
              }
              className="h-14 rounded-2xl border border-white/10 bg-[#020817] px-5 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              required
            />

            <button
              type="submit"
              className="h-14 rounded-2xl bg-blue-600 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
            >
              {editingBusId
                ? "Update Bus"
                : "Add Bus"}
            </button>

          </form>

        </div>

        {/* BUS LIST */}

        <div className="grid gap-5">

          {buses.map((bus) => (

            <div
              key={bus._id}
              className="rounded-3xl border border-white/10 bg-[#071226]/80 p-6 backdrop-blur-xl transition-all hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10"
            >

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                {/* LEFT */}

                <div className="space-y-3">

                  <div className="inline-flex items-center rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    Active
                  </div>

                  <div>

                    <h2 className="text-2xl font-bold text-white">
                      {bus.busName}
                    </h2>

                    <p className="mt-1 text-slate-400">
                      {bus.busId} •{" "}
                      {bus.routeName}
                    </p>

                  </div>

                  <div className="space-y-1 text-sm">

                    <p className="text-slate-300">
                      Driver:{" "}
                      <span className="text-white">
                        {bus.driverName}
                      </span>
                    </p>

                    <p className="text-slate-300">
                      Conductor:{" "}
                      <span className="text-white">
                        {bus.conductorName}
                      </span>
                    </p>

                    <p className="text-cyan-400">
                      Device ID:{" "}
                      {bus.deviceId}
                    </p>

                  </div>

                </div>

                {/* ACTION BUTTONS */}

                <div className="flex items-center gap-3">

                  <button
                    onClick={() => {
                      setEditingBusId(
                        bus._id
                      );

                      setFormData({
                        busId: bus.busId,
                        busName:
                          bus.busName,
                        driverName:
                          bus.driverName,
                        conductorName:
                          bus.conductorName,
                        routeName:
                          bus.routeName,
                        deviceId: String(
                          bus.deviceId
                        ),
                      });
                    }}
                    className="rounded-2xl bg-yellow-500 px-6 py-3 text-sm font-semibold text-black transition hover:scale-105 hover:bg-yellow-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteBus(bus._id)
                    }
                    className="rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-red-500"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}