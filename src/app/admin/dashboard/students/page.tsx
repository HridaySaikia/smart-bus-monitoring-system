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

export default function StudentsPage() {

  const [students, setStudents] =
    useState<Student[]>([]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [formData, setFormData] =
    useState({
      studentId: "",
      name: "",
      className: "",
      rollNo: "",
      cardUid: "",
      parentId: "",
      busId: "",
    });

  const fetchStudents = async () => {

    try {

      const response =
        await fetch("/api/students");

      const data =
        await response.json();

      setStudents(data.students || []);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    fetchStudents();

  }, []);

  // ADD STUDENT
  const addStudent = async () => {

    try {

      const response = await fetch(
        "/api/students",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        }
      );

      if (response.ok) {

        fetchStudents();

        setFormData({
          studentId: "",
          name: "",
          className: "",
          rollNo: "",
          cardUid: "",
          parentId: "",
          busId: "",
        });
      }

    } catch (error) {

      console.error(error);
    }
  };

  // DELETE STUDENT
  const deleteStudent = async (
    id: string
  ) => {

    try {

      const response = await fetch(
        `/api/students/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {

        setStudents((prev) =>
          prev.filter(
            (student) =>
              student._id !== id
          )
        );
      }

    } catch (error) {

      console.error(error);
    }
  };

  // UPDATE STUDENT
  const updateStudent = async () => {

    if (!editingId) return;

    try {

      const response = await fetch(
        `/api/students/${editingId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        }
      );

      if (response.ok) {

        fetchStudents();

        setEditingId(null);

        setFormData({
          studentId: "",
          name: "",
          className: "",
          rollNo: "",
          cardUid: "",
          parentId: "",
          busId: "",
        });
      }

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <main className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Students
        </h1>

        <p className="text-slate-400">
          Manage student database
        </p>
      </div>

      {/* FORM */}

      <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">

        <h2 className="mb-4 text-xl font-bold text-white">
          {editingId
            ? "Edit Student"
            : "Add Student"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          <input
            type="text"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={(e) =>
              setFormData({
                ...formData,
                studentId:
                  e.target.value,
              })
            }
            className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white"
          />

          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name:
                  e.target.value,
              })
            }
            className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white"
          />

          <input
            type="text"
            placeholder="Class"
            value={formData.className}
            onChange={(e) =>
              setFormData({
                ...formData,
                className:
                  e.target.value,
              })
            }
            className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white"
          />

          <input
            type="text"
            placeholder="Roll No"
            value={formData.rollNo}
            onChange={(e) =>
              setFormData({
                ...formData,
                rollNo:
                  e.target.value,
              })
            }
            className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white"
          />

          <input
            type="text"
            placeholder="RFID UID"
            value={formData.cardUid}
            onChange={(e) =>
              setFormData({
                ...formData,
                cardUid:
                  e.target.value,
              })
            }
            className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white"
          />

          <input
            type="text"
            placeholder="Parent ID"
            value={formData.parentId}
            onChange={(e) =>
              setFormData({
                ...formData,
                parentId:
                  e.target.value,
              })
            }
            className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white"
          />

          <input
            type="text"
            placeholder="Bus ID"
            value={formData.busId}
            onChange={(e) =>
              setFormData({
                ...formData,
                busId:
                  e.target.value,
              })
            }
            className="rounded-xl border border-white/10 bg-slate-950 p-3 text-white"
          />

        </div>

        <button
          onClick={
            editingId
              ? updateStudent
              : addStudent
          }
          className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          {editingId
            ? "Update Student"
            : "Add Student"}
        </button>

      </div>

      {/* STUDENTS LIST */}

      <div className="grid gap-4">

        {students.map((student) => (

          <div
            key={student._id}
            className="rounded-2xl border border-white/10 bg-slate-900 p-5"
          >

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div className="space-y-1">

                <h2 className="text-xl font-bold text-white">
                  {student.name}
                </h2>

                <p className="text-slate-400">
                  Student ID:
                  {" "}
                  {student.studentId}
                </p>

                <p className="text-slate-400">
                  Class:
                  {" "}
                  {student.className}
                </p>

                <p className="text-slate-400">
                  Roll No:
                  {" "}
                  {student.rollNo}
                </p>

                <p className="text-blue-400">
                  RFID UID:
                  {" "}
                  {student.cardUid}
                </p>

                <p className="text-slate-400">
                  Bus ID:
                  {" "}
                  {student.busId}
                </p>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => {

                    setEditingId(
                      student._id
                    );

                    setFormData({
                      studentId:
                        student.studentId,

                      name:
                        student.name,

                      className:
                        student.className,

                      rollNo:
                        student.rollNo,

                      cardUid:
                        student.cardUid,

                      parentId:
                        student.parentId,

                      busId:
                        student.busId,
                    });
                  }}
                  className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteStudent(
                      student._id
                    )
                  }
                  className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        ))}
      </div>
    </main>
  );
}