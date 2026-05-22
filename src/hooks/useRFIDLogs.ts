"use client";

import { useEffect, useState } from "react";

export interface RFIDLog {
  _id?: string;
  studentId: string;
  studentName: string;
  cardUid: string;
  action: "ENTRY" | "EXIT";
  busId: string;
  time: string;
}

export default function useRFIDLogs() {
  const [logs, setLogs] = useState<RFIDLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/rfid-logs");
      const data = await res.json();
      setLogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("RFID fetch error:", error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();

    const interval = setInterval(fetchLogs, 5000);

    return () => clearInterval(interval);
  }, []);

  return { logs, loading };
}