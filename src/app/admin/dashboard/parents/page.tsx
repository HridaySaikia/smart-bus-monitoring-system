"use client";

import useParents from "@/hooks/useParents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ParentsPage() {
  const { parents, loading } = useParents();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Parents Master Data
        </h2>
        <p className="mt-2 text-muted-foreground">
          Registered parent accounts linked to student records.
        </p>
      </section>

      <Card className="border-border bg-card/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Parents List</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading ? (
            <div className="rounded-2xl border border-border bg-background/60 p-4 text-sm text-muted-foreground">
              Loading parents...
            </div>
          ) : parents.length === 0 ? (
            <div className="rounded-2xl border border-border bg-background/60 p-4 text-sm text-muted-foreground">
              No parents found.
            </div>
          ) : (
            parents.map((parent) => (
              <div
                key={parent._id ?? parent.parentId}
                className="rounded-2xl border border-border bg-background/60 p-4"
              >
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Parent Name</p>
                    <p className="mt-1 font-semibold text-white">{parent.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Parent ID</p>
                    <p className="mt-1 font-semibold text-white">{parent.parentId}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="mt-1 font-semibold text-white">{parent.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="mt-1 font-semibold text-white">{parent.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Child Student ID</p>
                    <p className="mt-1 font-semibold text-white">
                      {parent.childStudentId}
                    </p>
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