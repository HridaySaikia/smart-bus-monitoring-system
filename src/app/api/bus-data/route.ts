import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const dbName = process.env.MONGODB_DB || "smart_bus_monitoring";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const busId = searchParams.get("busId");

    const client = await clientPromise;
    const db = client.db(dbName);

    let query = {};

    if (busId) {
      query = { busId };
    }

    const latestBusData = await db
      .collection("bus_data")
      .find(query)
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray();

    return NextResponse.json(
      latestBusData[0] || null,
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/bus-data error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch bus data",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Incoming GPS:", body);

    const client = await clientPromise;
    const db = client.db(dbName);

    await db.collection("bus_data").insertOne({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/bus-data error:", error);

    return NextResponse.json(
      {
        message: "Failed to store bus data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}