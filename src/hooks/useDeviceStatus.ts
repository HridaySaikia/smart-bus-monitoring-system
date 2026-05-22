"use client";

import { useEffect, useState } from "react";

export interface DeviceStatusData {
  _id?: string;
  busId: string;
  esp32: string;
  gps: string;
  rfid: string;
  mpu6050: string;
  oled: string;
  updatedAt?: string;
  createdAt?: string;
}

export default function useDeviceStatus() {
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatusData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDeviceStatus = async () => {
    try {
      const res = await fetch("/api/device-status");
      const data = await res.json();
      setDeviceStatus(data && Object.keys(data).length > 0 ? data : null);
    } catch (error) {
      console.error("Error fetching device status:", error);
      setDeviceStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceStatus();

    const interval = setInterval(fetchDeviceStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  return { deviceStatus, loading };
}