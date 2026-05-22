import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/collections";

const dbName = process.env.MONGODB_DB || "smart_bus_monitoring";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const alerts = await db
      .collection(COLLECTIONS.ALERTS)
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json(alerts, { status: 200 });
  } catch (error) {
    console.error("GET /api/alerts error:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch alerts",
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

    const newAlert = {
      busId: body.busId ?? "BUS-01",
      type: body.type ?? "SYSTEM",
      message: body.message ?? "No message provided",
      severity: body.severity ?? "Info",
      resolved: body.resolved ?? false,
      time: body.time ?? new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection(COLLECTIONS.ALERTS).insertOne(newAlert);

    return NextResponse.json(
      {
        message: "Alert created successfully",
        insertedId: result.insertedId,
        alert: newAlert,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/alerts error:", error);
    return NextResponse.json(
      {
        message: "Failed to create alert",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}