import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const baseUrl = "https://frontend-take-home-service.fetch.com";

  try {
    const cookie = req.headers.get("cookie");
    if (!cookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
