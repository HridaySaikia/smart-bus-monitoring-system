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
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Manage Buses
        </h1>

        <p className="text-muted-foreground">
          Add, update and manage buses
          dynamically
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card/60 p-6">
        <form
          onSubmit={(e) => {
            if (editingBusId) {
              e.preventDefault();

              updateBus(editingBusId);
            } else {
              handleSubmit(e);
            }
          }}
          className="grid gap-4 md:grid-cols-2"
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
            className="rounded-xl border border-border bg-background p-3 text-white"
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
            className="rounded-xl border border-border bg-background p-3 text-white"
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
            className="rounded-xl border border-border bg-background p-3 text-white"
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
            className="rounded-xl border border-border bg-background p-3 text-white"
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
            className="rounded-xl border border-border bg-background p-3 text-white"
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
            className="rounded-xl border border-border bg-background p-3 text-white"
            required
          />

          <button
            type="submit"
            className="rounded-xl bg-blue-600 p-3 font-semibold text-white"
          >
            {editingBusId
              ? "Update Bus"
              : "Add Bus"}
          </button>
        </form>
      </div>

      <div className="grid gap-4">
        {buses.map((bus) => (
          <div
            key={bus._id}
            className="rounded-3xl border border-border bg-card/60 p-5"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {bus.busName}
                </h2>

                <p className="text-muted-foreground">
                  {bus.busId} •{" "}
                  {bus.routeName}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Driver:{" "}
                  {bus.driverName}
                </p>

                <p className="text-sm text-slate-400">
                  Conductor:{" "}
                  {bus.conductorName}
                </p>

                <p className="text-sm text-blue-400">
                  Device ID:{" "}
                  {bus.deviceId}
                </p>
              </div>

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
                  className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteBus(bus._id)
                  }
                  className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}