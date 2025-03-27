import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const baseUrl = "https://frontend-take-home-service.fetch.com";

  try {
    // pull the cookie out of the headers
    const cookie = req.headers.get("cookie");

    // if there is no cookie, redirect to login
    if (!cookie) {
      return redirect("/login");
    }

    const url = `${baseUrl}/dogs/breeds`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie,
      },
      credentials: "include",
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}
