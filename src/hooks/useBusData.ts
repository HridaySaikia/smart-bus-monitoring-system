"use client";

import { useEffect, useState } from "react";

export default function useBusData() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchBusData = async () => {
    try {
      const res = await fetch("/api/bus-data", {
        cache: "no-store",
      });

      const text = await res.text();

      if (!text) {
        console.error("Empty response from /api/bus-data");
        return;
      }

      const json = JSON.parse(text);

      setData(json);
    } catch (error) {
      console.error("Error fetching bus data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusData();

    const interval = setInterval(fetchBusData, 5000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading };
}