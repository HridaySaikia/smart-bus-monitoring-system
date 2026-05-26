import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

const dbName =
  process.env.MONGODB_DB ||
  "smart_bus_monitoring";

export async function POST(
  request: NextRequest
) {
  try {

    const body = await request.json();

    // CLEAN UID
    const uid = body.uid
      ?.trim()
      ?.toUpperCase();

    const busId = body.busId;

    // VALIDATION
    if (!uid || !busId) {

      return NextResponse.json(
        {
          success: false,
          message:
            "UID and Bus ID required",
        },
        { status: 400 }
      );
    }

    const client =
      await clientPromise;

    const db =
      client.db(dbName);

    // FIND STUDENT
    const student = await db
      .collection("students")
      .findOne({
        rfidUid: uid,
      });

    // IF STUDENT NOT FOUND
    if (!student) {

      // SAVE UNKNOWN CARD LOG
      await db
        .collection("rfid_logs")
        .insertOne({
          uid,
          studentId: "UNKNOWN",
          studentName:
            "Unknown Card",
          busId,
          timestamp: new Date(),
          status: "ACCESS_DENIED",
        });

      return NextResponse.json(
        {
          success: false,
          message:
            "Unknown card",
        },
        { status: 404 }
      );
    }

    // SAVE RFID LOG
    await db
      .collection("rfid_logs")
      .insertOne({
        uid,
        studentId:
          student.studentId,
        studentName:
          student.name,
        busId,
        timestamp: new Date(),
        status: "ONBOARDED",
      });

    return NextResponse.json({
      success: true,

      message:
        "Attendance marked successfully",

      student: {
        studentId:
          student.studentId,

        name: student.name,

        class:
          student.class,
      },
    });

  } catch (error) {

    console.error(
      "RFID ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error",
      },
      { status: 500 }
    );
  }
}