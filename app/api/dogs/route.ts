import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  try {
    // pull the cookie out of the headers
    const cookie = req.headers.get("cookie");

    // if there is no cookie, redirect to login
    if (!cookie) {
      return redirect("/login");
    }

    const url = `${process.env.BASE_URL}/dogs/breeds`;
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
