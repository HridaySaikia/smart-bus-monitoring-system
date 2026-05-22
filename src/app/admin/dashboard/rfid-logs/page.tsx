"use client";

import { useEffect, useState } from "react";

type Log = {
  _id: string;
  studentName: string;
  busId: string;
  action: string;
  createdAt: string;
};

export default function RFIDLogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);

  const fetchLogs = async () => {
    try {
      const response = await fetch("/api/rfid/logs");

      const data = await response.json();

      setLogs(data.logs || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLogs();

    const interval = setInterval(fetchLogs, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          RFID Live Logs
        </h1>

        <p className="text-slate-400">
          Real-time student boarding logs
        </p>
      </div>

      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log._id}
            className="rounded-2xl border border-white/10 bg-slate-900 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {log.studentName}
                </h2>

                <p className="text-slate-400">
                  Bus: {log.busId}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`font-bold ${
                    log.action === "IN"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {log.action}
                </p>

                <p className="text-sm text-slate-500">
                  {new Date(
                    log.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}