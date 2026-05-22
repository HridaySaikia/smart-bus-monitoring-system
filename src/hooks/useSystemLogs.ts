"use client";

import { useEffect, useState } from "react";

interface SystemLogItem {
  id: string;
  source: "ALERT" | "RFID" | "DEVICE";
  title: string;
  message: string;
  time: string;
  severity: "Info" | "Warning" | "Critical" | "Success";
}

export default function useSystemLogs() {
  const [logs, setLogs] = useState<SystemLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const [alertsRes, rfidRes, deviceRes] = await Promise.all([
        fetch("/api/alerts"),
        fetch("/api/rfid-logs"),
        fetch("/api/device-status"),
      ]);

      const alerts = await alertsRes.json();
      const rfidLogs = await rfidRes.json();
      const deviceStatus = await deviceRes.json();

      const mappedAlerts: SystemLogItem[] = Array.isArray(alerts)
        ? alerts.map((alert: any, index: number) => ({
            id: alert._id ?? `alert-${index}`,
            source: "ALERT",
            title: `${alert.type} Alert`,
            message: alert.message,
            time: alert.time ?? alert.createdAt ?? new Date().toISOString(),
            severity: alert.severity ?? "Info",
          }))
        : [];

      const mappedRFID: SystemLogItem[] = Array.isArray(rfidLogs)
        ? rfidLogs.map((log: any, index: number) => ({
            id: log._id ?? `rfid-${index}`,
            source: "RFID",
            title: `RFID ${log.action}`,
            message: `${log.studentName} (${log.studentId}) ${log.action === "ENTRY" ? "entered" : "exited"} the bus`,
            time: log.time ?? log.createdAt ?? new Date().toISOString(),
            severity: "Info",
          }))
        : [];

      const mappedDevice: SystemLogItem[] =
        deviceStatus && Object.keys(deviceStatus).length > 0
          ? [
              {
                id: deviceStatus._id ?? "device-latest",
                source: "DEVICE",
                title: "Device Status Update",
                message: `ESP32: ${deviceStatus.esp32}, GPS: ${deviceStatus.gps}, RFID: ${deviceStatus.rfid}, MPU6050: ${deviceStatus.mpu6050}, OLED: ${deviceStatus.oled}`,
                time:
                  deviceStatus.updatedAt ??
                  deviceStatus.createdAt ??
                  new Date().toISOString(),
                severity: "Success",
              },
            ]
          : [];

      const combined = [...mappedAlerts, ...mappedRFID, ...mappedDevice].sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );

      setLogs(combined);
    } catch (error) {
      console.error("Error fetching system logs:", error);
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