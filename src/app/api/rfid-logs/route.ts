import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/collections";

const dbName = process.env.MONGODB_DB || "smart_bus_monitoring";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const logs = await db
      .collection(COLLECTIONS.RFID_LOGS)
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error("GET /api/rfid-logs error:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch RFID logs",
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

    const newLog = {
      studentId: body.studentId ?? "STU-001",
      studentName: body.studentName ?? "Unknown Student",
      cardUid: body.cardUid ?? "UNKNOWN_UID",
      action: body.action ?? "ENTRY",
      busId: body.busId ?? "BUS-01",
      time: body.time ?? new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection(COLLECTIONS.RFID_LOGS)
      .insertOne(newLog);

    return NextResponse.json(
      {
        message: "RFID log created successfully",
        insertedId: result.insertedId,
        log: newLog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/rfid-logs error:", error);
    return NextResponse.json(
      {
        message: "Failed to create RFID log",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}