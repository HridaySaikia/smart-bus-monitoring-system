import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

const dbName =
  process.env.MONGODB_DB ||
  "smart_bus_monitoring";
const TRACCAR_URL =
  process.env.TRACCAR_URL;
export async function GET() {
  try {
    // FETCH TRACCAR DATA
    const response = await fetch(
      `${TRACCAR_URL}/api/positions`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },

        cache: "no-store",
      }
    );

    // CHECK RESPONSE
    if (!response.ok) {
      throw new Error(
        "Traccar API failed"
      );
    }

    const positions =
      await response.json();

    // CONNECT TO DATABASE
    const client =
      await clientPromise;

    const db =
      client.db(dbName);

    // FETCH BUS DATA
    const dbBuses =
      await db
        .collection("buses")
        .find({})
        .toArray();

    // MERGE LIVE DATA + DB DATA
    const buses =
      positions.map((item: any) => {

        const matchedBus =
          dbBuses.find(
            (bus: any) =>
              Number(bus.deviceId) ===
              Number(item.deviceId)
          );

        return {
          id: item.id,

          deviceId:
            item.deviceId,

          busId:
            matchedBus?.busId ||
            "",

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
            matchedBus?.routeName ||
            "",

          latitude:
            item.latitude,

          longitude:
            item.longitude,

          speed:
            item.speed || 0,

          status:
            item.attributes?.motion
              ? "Moving"
              : "Stopped",

          battery:
            item.attributes?.batteryLevel ||
            0,

          fixTime:
            item.fixTime,
        };
      });

    return NextResponse.json({
      success: true,
      buses,
    });

  } catch (error) {

    console.error(
      "TRACCAR ERROR:",
      error
    );

    // RETURN EMPTY ARRAY
    return NextResponse.json({
      success: true,
      buses: [],
    });
  }
}