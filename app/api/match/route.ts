import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  try {
    // Get the array of IDs from the request body
    const dogIds = await req.json();

    const cookie = req.headers.get("cookie");

    if (!cookie) {
      return redirect("/login");
    }

    // Validate that we received an array
    if (!Array.isArray(dogIds)) {
      return NextResponse.json(
        { error: "Invalid request body: expected an array of dog IDs" },
        { status: 400 }
      );
    }

    // Forward the request to the external API
    const response = await fetch(`${process.env.BASE_URL}/dogs/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie,
      },
      body: JSON.stringify(dogIds), // Send the array directly as the body
      credentials: "include", // Forward cookies for auth
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch dogs by IDs" },
        { status: response.status }
      );
    }

    // Return the data from the external API
    const dogs = await response.json();

    return NextResponse.json(dogs);
  } catch (error) {
    console.error("Error fetching dogs by IDs:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
