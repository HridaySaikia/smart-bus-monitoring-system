import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

const dbName =
  process.env.MONGODB_DB ||
  "smart_bus_monitoring";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db(dbName);

    const logs = await db
      .collection("rfid_logs")
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({
      success: true,
      logs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        logs: [],
      },
      { status: 500 }
    );
  }
}