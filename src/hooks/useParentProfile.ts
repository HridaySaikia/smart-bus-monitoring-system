"use client";

import { useEffect, useState } from "react";
import { getStoredParentId } from "@/lib/parent-session";

interface ParentProfile {
  _id?: string;
  parentId: string;
  name: string;
  email: string;
  phone: string;
  childStudentId: string;
}

export default function useParentProfile() {
  const [parentProfile, setParentProfile] = useState<ParentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchParentProfile = async () => {
    try {
      const parentId = getStoredParentId();

      if (!parentId) {
        setParentProfile(null);
        setLoading(false);
        return;
      }

      const res = await fetch("/api/parents");
      const parents = await res.json();

      if (Array.isArray(parents)) {
        const matchedParent = parents.find(
          (parent: ParentProfile) => parent.parentId === parentId
        );
        setParentProfile(matchedParent || null);
      } else {
        setParentProfile(null);
      }
    } catch (error) {
      console.error("Error fetching parent profile:", error);
      setParentProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParentProfile();
  }, []);

  return { parentProfile, loading };
}