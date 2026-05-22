"use client";

import { useEffect, useState } from "react";

export interface AlertItem {
  _id?: string;
  busId: string;
  type: string;
  message: string;
  severity: string;
  resolved: boolean;
  time: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function useAlerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      const res = await fetch("/api/alerts");
      const data = await res.json();
      setAlerts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();

    const interval = setInterval(fetchAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  return { alerts, loading };
}