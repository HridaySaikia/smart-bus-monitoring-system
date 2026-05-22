import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const dbName =
  process.env.MONGODB_DB ||
  "smart_bus_monitoring";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { uid, busId } = body;

    if (!uid || !busId) {
      return NextResponse.json(
        {
          success: false,
          message: "UID and Bus ID required",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;

    const db = client.db(dbName);

    // FIND STUDENT
    const student = await db
      .collection("students")
      .findOne({
        cardUid: uid,
      });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        { status: 404 }
      );
    }

    // CHECK LAST RFID LOG
    const lastLog = await db
      .collection("rfid_logs")
      .findOne(
        {
          studentId: student.studentId,
        },
        {
          sort: { createdAt: -1 },
        }
      );

    let action = "IN";

    if (lastLog?.action === "IN") {
      action = "OUT";
    }

    // SAVE RFID LOG
    await db.collection("rfid_logs").insertOne({
      studentId: student.studentId,
      studentName: student.name,
      busId,
      uid,
      action,
      createdAt: new Date(),
    });

    // TELEGRAM MESSAGE
    const telegramMessage = `
🚌 Smart Bus Alert

👦 Student: ${student.name}

🆔 Student ID: ${student.studentId}

🚌 Bus: ${busId}

📍 Status:
${action === "IN"
  ? "Boarded Bus"
  : "Left Bus"}

⏰ Time:
${new Date().toLocaleString()}
`;

    // SEND TELEGRAM MESSAGE
    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          chat_id:
            process.env.TELEGRAM_CHAT_ID,

          text: telegramMessage,
        }),
      }
    );

    return NextResponse.json({
      success: true,
      studentName: student.name,
      action,
      message:
        action === "IN"
          ? "Student Boarded Bus"
          : "Student Left Bus",
    });
  } catch (error) {
    console.error(
      "RFID SCAN ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "RFID scan failed",
      },
      { status: 500 }
    );
  }
}