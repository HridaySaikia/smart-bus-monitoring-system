"use client";

import useStudents from "@/hooks/useStudents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentsMasterPage() {
  const { students, loading } = useStudents();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Students Master Data
        </h2>
        <p className="mt-2 text-muted-foreground">
          Registered students linked to RFID cards, bus IDs, and parent IDs.
        </p>
      </section>

      <Card className="border-border bg-card/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Students List</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading ? (
            <div className="rounded-2xl border border-border bg-background/60 p-4 text-sm text-muted-foreground">
              Loading students...
            </div>
          ) : students.length === 0 ? (
            <div className="rounded-2xl border border-border bg-background/60 p-4 text-sm text-muted-foreground">
              No students found.
            </div>
          ) : (
            students.map((student) => (
              <div
                key={student._id ?? student.studentId}
                className="rounded-2xl border border-border bg-background/60 p-4"
              >
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Student Name</p>
                    <p className="mt-1 font-semibold text-white">{student.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Student ID</p>
                    <p className="mt-1 font-semibold text-white">{student.studentId}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Class / Roll</p>
                    <p className="mt-1 font-semibold text-white">
                      {student.className} / {student.rollNo}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Card UID</p>
                    <p className="mt-1 font-semibold text-white">{student.cardUid}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Parent ID</p>
                    <p className="mt-1 font-semibold text-white">{student.parentId}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Bus ID</p>
                    <p className="mt-1 font-semibold text-white">{student.busId}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}