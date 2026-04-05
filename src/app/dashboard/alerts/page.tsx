const alerts = [
  { type: "Emergency", message: "Emergency button pressed", time: "10:21 AM" },
  { type: "Motion", message: "Abnormal bus tilt detected", time: "10:25 AM" },
  { type: "GPS", message: "Location refresh delayed", time: "10:27 AM" },
];

export default function AlertsPage() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-2xl font-bold text-slate-900">Alerts</h2>
      <p className="mt-2 text-slate-600">
        Emergency, motion, and system alerts will be listed here.
      </p>

      <div className="mt-6 space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="rounded-xl border border-slate-200 p-4">
            <p className="font-semibold text-slate-900">{alert.type}</p>
            <p className="mt-1 text-slate-600">{alert.message}</p>
            <p className="mt-2 text-sm text-slate-400">{alert.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}