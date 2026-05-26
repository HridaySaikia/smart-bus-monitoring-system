import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

const dbName =
  process.env.MONGODB_DB ||
  "smart_bus_monitoring";

const TRACCAR_URL =
  process.env.TRACCAR_URL;

const TRACCAR_USERNAME =
  process.env.TRACCAR_USERNAME;

const TRACCAR_PASSWORD =
  process.env.TRACCAR_PASSWORD;

export async function GET() {
  try {

    // BASIC AUTH
    const auth =
      Buffer.from(
        `${TRACCAR_USERNAME}:${TRACCAR_PASSWORD}`
      ).toString("base64");

    // FETCH POSITIONS
    const response = await fetch(
      `${TRACCAR_URL}/api/positions`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },

        cache: "no-store",
      }
    );

    if (!response.ok) {

      throw new Error(
        `Traccar API failed: ${response.status}`
      );
    }

    const rawPositions =
      await response.json();

    // KEEP ONLY LATEST POSITION FOR EACH DEVICE
    const latestPositionsMap = new Map();

    rawPositions.forEach((position: any) => {

      const existing =
        latestPositionsMap.get(
          position.deviceId
        );

      if (
        !existing ||
        new Date(position.fixTime) >
          new Date(existing.fixTime)
      ) {

        latestPositionsMap.set(
          position.deviceId,
          position
        );
      }
    });

    const positions = Array.from(
      latestPositionsMap.values()
    );

    // DATABASE
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

    // MERGE DATA
    const buses = positions
  .map((item: any) => {

    const matchedBus =
      dbBuses.find(
        (bus: any) =>
          Number(bus.deviceId) ===
          Number(item.deviceId)
      );

    // REMOVE UNKNOWN BUSES
    if (!matchedBus) {
      return null;
    }

    return {
      id: item.id,

      deviceId:
        item.deviceId,

      busId:
        matchedBus.busId,

      busName:
        matchedBus.busName,

      driverName:
        matchedBus.driverName,

      conductorName:
        matchedBus.conductorName,

      routeName:
        matchedBus.routeName,

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
        item.attributes?.batteryLevel || 0,

      fixTime:
        item.fixTime,
    };
  })

  .filter(Boolean);

    return NextResponse.json({
      success: true,
      buses,
    });

  } catch (error) {

    console.error(
      "TRACCAR ERROR:",
      error
    );

    return NextResponse.json({
      success: false,
      buses: [],
    });
  }
}