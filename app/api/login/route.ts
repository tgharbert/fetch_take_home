import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email } = await req.json();
  const baseUrl = "https://frontend-take-home-service.fetch.com";

  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const setCookie = response.headers.get("set-cookie");
  if (!setCookie) {
    throw new Error("No cookie set");
  }

  const res = NextResponse.json({ message: "Login successful" });
  res.headers.set("set-cookie", setCookie);

  return res;
}
