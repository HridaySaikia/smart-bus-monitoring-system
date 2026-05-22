import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/collections";

const dbName = process.env.MONGODB_DB || "smart_bus_monitoring";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const parents = await db
      .collection(COLLECTIONS.PARENTS)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(parents, { status: 200 });
  } catch (error) {
    console.error("GET /api/parents error:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch parents",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db(dbName);

    const newParent = {
      parentId: body.parentId ?? "PAR-001",
      name: body.name ?? "Unknown Parent",
      email: body.email ?? "parent@example.com",
      phone: body.phone ?? "0000000000",
      childStudentId: body.childStudentId ?? "STU-001",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection(COLLECTIONS.PARENTS)
      .insertOne(newParent);

    return NextResponse.json(
      {
        message: "Parent created successfully",
        insertedId: result.insertedId,
        parent: newParent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/parents error:", error);
    return NextResponse.json(
      {
        message: "Failed to create parent",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}