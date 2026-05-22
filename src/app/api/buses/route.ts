import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const dbName =
  process.env.MONGODB_DB ||
  "smart_bus_monitoring";
  
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;

    const db = client.db(
      process.env.MONGODB_DB
    );

    const busData = {
      busId: body.busId,
      busName: body.busName,
      driverName: body.driverName,
      conductorName:
        body.conductorName,
      routeName: body.routeName,

      // IMPORTANT
      deviceId: Number(
        body.deviceId
      ),

      status: body.status,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection("buses")
      .insertOne(busData);

    return NextResponse.json(
      {
        success: true,
        insertedId:
          result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create bus",
      },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db(dbName);

    const buses = await db
      .collection("buses")
      .find({})
      .toArray();

    const formattedBuses = buses.map((bus) => ({
      ...bus,
      _id: bus._id.toString(),
    }));

    return NextResponse.json({
      buses: formattedBuses,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        buses: [],
      },
      { status: 500 }
    );
  }
}