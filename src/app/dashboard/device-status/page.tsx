const devices = [
  { name: "ESP32", status: "Online" },
  { name: "GPS Module", status: "Connected" },
  { name: "RFID Reader", status: "Connected" },
  { name: "MPU6050", status: "Active" },
  { name: "OLED Display", status: "Active" },
];

export default function DeviceStatusPage() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-2xl font-bold text-slate-900">Device Status</h2>
      <p className="mt-2 text-slate-600">
        Current health and connectivity of hardware modules.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => (
          <div
            key={device.name}
            className="rounded-xl border border-slate-200 p-4"
          >
            <p className="font-semibold text-slate-900">{device.name}</p>
            <p className="mt-2 text-slate-600">{device.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}