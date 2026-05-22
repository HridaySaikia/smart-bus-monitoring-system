"use client";

import { useEffect, useState } from "react";

export interface ParentItem {
  _id?: string;
  parentId: string;
  name: string;
  email: string;
  phone: string;
  childStudentId: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function useParents() {
  const [parents, setParents] = useState<ParentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchParents = async () => {
    try {
      const res = await fetch("/api/parents");
      const data = await res.json();
      setParents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching parents:", error);
      setParents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);

  return { parents, loading, refetchParents: fetchParents };
}