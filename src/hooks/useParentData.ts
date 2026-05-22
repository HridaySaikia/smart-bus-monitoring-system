"use client";

import { useEffect, useState } from "react";

export default function useParentData(studentId?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      if (!studentId) return;

      const [busRes, logsRes, studentsRes] = await Promise.all([
        fetch("/api/bus-data"),
        fetch("/api/rfid-logs"),
        fetch("/api/students"),
      ]);

      const busData = await busRes.json();
      const logs = await logsRes.json();
      const students = await studentsRes.json();

      const studentLogs = Array.isArray(logs)
        ? logs.filter((log: any) => log.studentId === studentId)
        : [];

      const latestLog = studentLogs[0];

      const studentProfile = Array.isArray(students)
        ? students.find((student: any) => student.studentId === studentId)
        : null;

      setData({
        bus: busData,
        latestLog,
        studentProfile,
      });
    } catch (error) {
      console.error("Parent data error:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [studentId]);

  return { data, loading };
}