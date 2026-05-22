import { NextRequest, NextResponse } from "next/server";

import { ObjectId } from "mongodb";

import clientPromise from "@/lib/mongodb";

const dbName =
  process.env.MONGODB_DB ||
  "smart_bus_monitoring";

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {

    const { id } =
      await context.params;

    const body =
      await request.json();

    const client =
      await clientPromise;

    const db =
      client.db(dbName);

    await db
      .collection("students")
      .updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            ...body,
            updatedAt:
              new Date(),
          },
        }
      );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {

    const { id } =
      await context.params;

    const client =
      await clientPromise;

    const db =
      client.db(dbName);

    await db
      .collection("students")
      .deleteOne({
        _id: new ObjectId(id),
      });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}