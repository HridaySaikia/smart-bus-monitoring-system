const students = [
  { name: "Rahul Das", action: "Entered", time: "10:10 AM", status: "Onboard" },
  { name: "Ananya Bora", action: "Entered", time: "10:12 AM", status: "Onboard" },
  { name: "Riya Sharma", action: "Exited", time: "10:18 AM", status: "Dropped" },
  { name: "Aman Kalita", action: "Entered", time: "10:21 AM", status: "Onboard" },
];

export default function StudentsPage() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Student Monitoring</h2>
          <p className="mt-1 text-slate-400">
            RFID-based entry and exit activity logs.
          </p>
        </div>

        <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
          Total Onboard: 28
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-2xl">
          <thead>
            <tr className="border-b border-white/10 bg-slate-900/80 text-left text-sm text-slate-400">
              <th className="px-5 py-4 font-medium">Student Name</th>
              <th className="px-5 py-4 font-medium">Action</th>
              <th className="px-5 py-4 font-medium">Time</th>
              <th className="px-5 py-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className="border-b border-white/5 bg-slate-950/40 text-sm text-slate-200 transition hover:bg-white/[0.03]"
              >
                <td className="px-5 py-4">{student.name}</td>
                <td className="px-5 py-4">{student.action}</td>
                <td className="px-5 py-4">{student.time}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      student.status === "Onboard"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-amber-500/15 text-amber-400"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}