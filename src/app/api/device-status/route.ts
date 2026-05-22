import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/collections";

const dbName = process.env.MONGODB_DB || "smart_bus_monitoring";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const latestStatus = await db
      .collection(COLLECTIONS.DEVICE_STATUS)
      .findOne({}, { sort: { createdAt: -1 } });

    return NextResponse.json(latestStatus ?? {}, { status: 200 });
  } catch (error) {
    console.error("GET /api/device-status error:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch device status",
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

    const statusDoc = {
      busId: body.busId ?? "BUS-01",
      esp32: body.esp32 ?? "Online",
      gps: body.gps ?? "Active",
      rfid: body.rfid ?? "Connected",
      mpu6050: body.mpu6050 ?? "Monitoring",
      oled: body.oled ?? "Operational",
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    const result = await db
      .collection(COLLECTIONS.DEVICE_STATUS)
      .insertOne(statusDoc);

    return NextResponse.json(
      {
        message: "Device status saved successfully",
        insertedId: result.insertedId,
        status: statusDoc,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/device-status error:", error);
    return NextResponse.json(
      {
        message: "Failed to save device status",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}