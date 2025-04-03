import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie");
    if (!cookie) {
      return redirect("/login");
    }

    // get the body of the request
    const body = await req.json();

    const response = await fetch(`${process.env.BASE_URL}/locations/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookie,
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch location info" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error getting locations by bounding box:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
