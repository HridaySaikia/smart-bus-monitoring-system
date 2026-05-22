import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const dbName = "smart_bus_monitoring";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db(dbName);

    const buses = await db
      .collection("bus_data")
      .find({})
      .toArray();

    const latestBusMap = new Map();

    buses.reverse().forEach((bus) => {
      if (!latestBusMap.has(bus.busId)) {
        latestBusMap.set(bus.busId, bus);
      }
    });

    return NextResponse.json({
      buses: Array.from(latestBusMap.values()),
    });
  } catch (error) {
    console.error("ALL LIVE BUSES ERROR:", error);

    return NextResponse.json(
      {
        buses: [],
      },
      { status: 500 }
    );
  }
}