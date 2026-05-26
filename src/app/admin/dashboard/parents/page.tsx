"use client";

import useParents from "@/hooks/useParents";

export default function ParentsPage() {

  const { parents, loading } = useParents();

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <section>

        <h2 className="text-3xl font-bold tracking-tight text-white">
          Parents Master Data
        </h2>

        <p className="mt-2 text-slate-400">
          Registered parent accounts linked to student records.
        </p>

      </section>

      {/* MAIN CARD */}

      <div className="rounded-3xl border border-white/10 bg-[#071226]/80 p-6 backdrop-blur-xl">

        {/* TABLE HEADER */}

        <div className="hidden grid-cols-5 gap-4 border-b border-white/10 pb-4 text-sm font-semibold text-slate-400 md:grid">

          <div>Parent Name</div>

          <div>Parent ID</div>

          <div>Email</div>

          <div>Phone</div>

          <div>Child Student ID</div>

        </div>

        {/* CONTENT */}

        <div className="mt-4 space-y-3">

          {loading ? (

            <div className="rounded-2xl border border-white/10 bg-[#020817] p-4 text-sm text-slate-400">
              Loading parents...
            </div>

          ) : parents.length === 0 ? (

            <div className="rounded-2xl border border-white/10 bg-[#020817] p-4 text-sm text-slate-400">
              No parents found.
            </div>

          ) : (

            parents.map((parent) => (

              <div
                key={parent._id ?? parent.parentId}
                className="grid gap-4 rounded-2xl border border-white/10 bg-[#020817]/80 p-4 transition-all hover:border-blue-500/30 hover:bg-[#081427] md:grid-cols-5"
              >

                {/* NAME */}

                <div>

                  <p className="text-xs text-slate-500 md:hidden">
                    Parent Name
                  </p>

                  <p className="font-medium text-white">
                    {parent.name}
                  </p>

                </div>

                {/* PARENT ID */}

                <div>

                  <p className="text-xs text-slate-500 md:hidden">
                    Parent ID
                  </p>

                  <p className="font-medium text-blue-400">
                    {parent.parentId}
                  </p>

                </div>

                {/* EMAIL */}

                <div>

                  <p className="text-xs text-slate-500 md:hidden">
                    Email
                  </p>

                  <p className="text-white break-all">
                    {parent.email}
                  </p>

                </div>

                {/* PHONE */}

                <div>

                  <p className="text-xs text-slate-500 md:hidden">
                    Phone
                  </p>

                  <p className="text-white">
                    {parent.phone}
                  </p>

                </div>

                {/* CHILD ID */}

                <div>

                  <p className="text-xs text-slate-500 md:hidden">
                    Child Student ID
                  </p>

                  <p className="font-medium text-cyan-400">
                    {parent.childStudentId}
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