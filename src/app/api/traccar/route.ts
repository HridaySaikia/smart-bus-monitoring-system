import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://demo.traccar.org/api/positions",
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`
        },
      }
    );

    const data = await response.json();

    return NextResponse.json({
      success: true,
      positions: data,
    });
  } catch (error) {
    console.error("TRACCAR ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        positions: [],
      },
      { status: 500 }
    );
  }
}