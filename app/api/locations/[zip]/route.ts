import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") || "",
      },
      body: req.body,
      credentials: "include",
    });
    console.log(response);
    return NextResponse.json(await response.json(), {
      status: response.status,
    });
  } catch (error) {
    console.error("Error getting location info by zip:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
