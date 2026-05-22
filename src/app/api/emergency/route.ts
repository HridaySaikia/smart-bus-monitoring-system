import { NextResponse } from "next/server";

let emergencyData = {
  active: false,
  message: "",
  busId: "",
  time: "",
};

export async function GET() {
  return NextResponse.json(emergencyData);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    emergencyData = {
      active: body.active,
      message: body.message,
      busId: body.busId,
      time: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      emergencyData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}