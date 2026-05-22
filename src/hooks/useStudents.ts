"use client";

import { useEffect, useState } from "react";

type Student = {
  _id: string;
  studentId: string;
  name: string;
  className: string;
  rollNo: string;
  cardUid: string;
 parentId: string;
  busId: string;
};

export default function useStudents() {

  const [students, setStudents] =
    useState<Student[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchStudents = async () => {

    try {

      const response =
        await fetch("/api/students");

      const data =
        await response.json();

      setStudents(
        data.students || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchStudents();

  }, []);

  return {
    students,
    loading,
    refresh:
      fetchStudents,
  };
}