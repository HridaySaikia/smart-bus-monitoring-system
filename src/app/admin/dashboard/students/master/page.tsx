"use client";

import useStudents from "@/hooks/useStudents";

export default function StudentsMasterPage() {
  const { students, loading } = useStudents();

  return (
    <div className="space-y-6">

      <section>

        <h2 className="text-3xl font-bold tracking-tight text-white">
          Students Master Data
        </h2>

        <p className="mt-2 text-slate-400">
          Registered students linked to RFID cards, bus IDs, and parent IDs.
        </p>

      </section>

      {/* MAIN CARD */}

      <div className="rounded-3xl border border-white/10 bg-[#071226]/80 p-6 backdrop-blur-xl">

        {/* HEADER ROW */}

        <div className="hidden grid-cols-7 gap-4 border-b border-white/10 pb-4 text-sm font-semibold text-slate-400 md:grid">

          <div>Name</div>

          <div>Student ID</div>

          <div>Class</div>

          <div>Roll</div>

          <div>RFID</div>

          <div>Parent ID</div>

          <div>Bus ID</div>

        </div>

        {/* CONTENT */}

        <div className="mt-4 space-y-3">

          {loading ? (

            <div className="rounded-2xl border border-white/10 bg-[#020817] p-4 text-sm text-slate-400">
              Loading students...
            </div>

          ) : students.length === 0 ? (

            <div className="rounded-2xl border border-white/10 bg-[#020817] p-4 text-sm text-slate-400">
              No students found.
            </div>

          ) : (

            students.map((student) => (

              <div
                key={student._id ?? student.studentId}
                className="grid gap-4 rounded-2xl border border-white/10 bg-[#020817]/80 p-4 transition-all hover:border-blue-500/30 hover:bg-[#081427] md:grid-cols-7"
              >

                <div>
                  <p className="text-xs text-slate-500 md:hidden">
                    Name
                  </p>

                  <p className="font-medium text-white">
                    {student.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 md:hidden">
                    Student ID
                  </p>

                  <p className="text-white">
                    {student.studentId}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 md:hidden">
                    Class
                  </p>

                  <p className="text-white">
                    {student.className}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 md:hidden">
                    Roll
                  </p>

                  <p className="text-white">
                    {student.rollNo}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 md:hidden">
                    RFID
                  </p>

                  <p className="text-cyan-400">
                    {student.cardUid}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 md:hidden">
                    Parent ID
                  </p>

                  <p className="text-white">
                    {student.parentId}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 md:hidden">
                    Bus ID
                  </p>

                  <p className="font-medium text-blue-400">
                    {student.busId}
                  </p>
                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}