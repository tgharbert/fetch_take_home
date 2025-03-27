import { NextResponse } from "next/server";

export async function POST() {
  // Create a response object
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  );

  // Clear the auth cookie
  response.cookies.delete("fetchCookie"); // Replace with your actual cookie name

  return response;
}
