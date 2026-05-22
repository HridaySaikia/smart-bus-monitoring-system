import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://demo.traccar.org/api/positions",
      {
        headers: {
          Authorization:
            "Bearer RjBEAiAUdNXSVO1P-YDtd9cXy01cMoWMVrPR8aYoKc_w_BzUaQIgJUfld-XlmfQDCo_KniXW3OOBV6Cr43QOntjmQ9_LZiZ7ImkiOjczNDI0NTkxMzE1NjI0NjYxOTQsInUiOjEyMTc2NCwiZSI6IjIwMzAtMDUtMDRUMTg6MzA6MDAuMDAwKzAwOjAwIn0",
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