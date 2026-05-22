import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const dbName =
  process.env.MONGODB_DB || "smart_bus_monitoring";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();

    const { id } = await context.params;

    const client = await clientPromise;

    const db = client.db(dbName);

    await db.collection("buses").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...body,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Bus updated successfully",
    });
  } catch (error) {
    console.error("PUT BUS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update bus",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const client = await clientPromise;

    const db = client.db(dbName);

    await db.collection("buses").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      message: "Bus deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BUS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete bus",
      },
      { status: 500 }
    );
  }
}