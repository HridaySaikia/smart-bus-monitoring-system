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

      const response = await fetch(
        "/api/rfid/logs"
      );

      const data = await response.json();

      setLogs(data.logs || []);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchLogs();

    const interval =
      setInterval(fetchLogs, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <main className="space-y-6">

      {/* HEADER */}

      <div className="space-y-2">

        <h1 className="text-3xl font-bold tracking-tight text-white">
          RFID Live Logs
        </h1>

        <p className="text-slate-400">
          Real-time student boarding activity
        </p>

      </div>

      {/* MAIN CONTAINER */}

      <div className="rounded-3xl border border-white/10 bg-[#071226]/80 p-6 backdrop-blur-xl">

        {/* HEADER ROW */}

        <div className="hidden grid-cols-4 gap-4 border-b border-white/10 pb-4 text-sm font-semibold text-slate-400 md:grid">

          <div>Student Name</div>

          <div>Bus ID</div>

          <div>Status</div>

          <div>Time</div>

        </div>

        {/* LOGS */}

        <div className="mt-4 space-y-3">

          {logs.length === 0 ? (

            <div className="rounded-2xl border border-white/10 bg-[#020817] p-4 text-sm text-slate-400">
              No RFID logs found.
            </div>

          ) : (

            logs.map((log) => (

              <div
                key={log._id}
                className="grid gap-4 rounded-2xl border border-white/10 bg-[#020817]/80 p-4 transition-all hover:border-blue-500/30 hover:bg-[#081427] md:grid-cols-4"
              >

                {/* STUDENT */}

                <div>

                  <p className="text-xs text-slate-500 md:hidden">
                    Student Name
                  </p>

                  <p className="font-medium text-white">
                    {log.studentName}
                  </p>

                </div>

                {/* BUS */}

                <div>

                  <p className="text-xs text-slate-500 md:hidden">
                    Bus ID
                  </p>

                  <p className="font-medium text-blue-400">
                    {log.busId}
                  </p>

                </div>

                {/* ACTION */}

                <div>

                  <p className="text-xs text-slate-500 md:hidden">
                    Status
                  </p>

                  <div
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      log.action === "IN"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {log.action}
                  </div>

                </div>

                {/* TIME */}

                <div>

                  <p className="text-xs text-slate-500 md:hidden">
                    Time
                  </p>

                  <p className="text-sm text-slate-300">
                    {new Date(
                      log.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </main>

  );
}