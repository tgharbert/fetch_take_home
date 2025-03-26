import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const userSession = cookieStore.get("user-session");

  if (userSession) {
    redirect("/dogs");
  } else {
    redirect("/login");
  }

  return null;
}
