import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

const dbName =
  process.env.MONGODB_DB ||
  "smart_bus_monitoring";

export async function GET() {
  try {
    // FETCH TRACCAR DATA
    const response = await fetch(
      "https://demo.traccar.org/api/positions",
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },

        cache: "no-store",
      }
    );

    const positions = await response.json();

    // CONNECT TO MONGODB
    const client = await clientPromise;

    const db = client.db(dbName);

    // FETCH ALL BUSES
    const dbBuses = await db
      .collection("buses")
      .find({})
      .toArray();

    const buses = positions.map((item: any) => {
      const matchedBus = dbBuses.find(
        (bus: any) =>
          Number(bus.deviceId) ===
          Number(item.deviceId)
      );

      return {
        id: item.id,

        deviceId: item.deviceId,

        busId:
          matchedBus?.busId || "",

        busName:
          matchedBus?.busName ||
          "Unknown Bus",

        driverName:
          matchedBus?.driverName ||
          "Not Assigned",

        conductorName:
          matchedBus?.conductorName ||
          "Not Assigned",

        routeName:
          matchedBus?.routeName || "",

        latitude: item.latitude,

        longitude: item.longitude,

        speed: item.speed || 0,

        status: item.attributes?.motion
          ? "Moving"
          : "Stopped",

        battery:
          item.attributes?.batteryLevel ||
          0,

        fixTime: item.fixTime,
      };
    });

    return NextResponse.json({
      success: true,
      buses,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        buses: [],
      },
      { status: 500 }
    );
  }
}  