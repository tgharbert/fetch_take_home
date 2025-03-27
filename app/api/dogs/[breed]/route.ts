import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET(
  req: NextRequest,
  { params }: { params: { breed: string } }
) {
  const { breed } = await params;
  const cookie = req.headers.get("cookie");

  if (!cookie) {
    return redirect("/login");
  }

  try {
    // Make the request to the external API
    const response = await fetch(
      `${process.env.BASE_URL}/dogs/search?breeds=${breed}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie,
        },
        credentials: "include",
      }
    );

    // If the response isn't successful, throw an error
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch dogs for breed: ${breed}` },
        { status: response.status }
      );
    }

    // Parse and return the data
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch dogs" },
      { status: 500 }
    );
  }
}
