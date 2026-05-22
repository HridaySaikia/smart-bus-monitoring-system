import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

const dbName =
  process.env.MONGODB_DB ||
  "smart_bus_monitoring";

export async function GET() {

  try {

    const client =
      await clientPromise;

    const db =
      client.db(dbName);

    const students =
      await db
        .collection("students")
        .find({})
        .toArray();

    return NextResponse.json({
      success: true,
      students,
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

export async function POST(
  request: NextRequest
) {

  try {

    const body =
      await request.json();

    const client =
      await clientPromise;

    const db =
      client.db(dbName);

    await db
      .collection("students")
      .insertOne({
        ...body,
        createdAt:
          new Date(),
        updatedAt:
          new Date(),
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