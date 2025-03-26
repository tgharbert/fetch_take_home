import DogList from "../components/dogs/DogList";
import { cookies } from "next/headers";

async function getDogs() {
  try {
    const cookieJar = await cookies();
    const cookieData = cookieJar.get("fetch-access-token");
    if (!cookieData) {
      throw new Error("No cookie found");
    }

    const cookieString = `${cookieData.name}=${cookieData.value}`;

    const url = `${process.env.BASE_URL}/dogs/breeds`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch dogs");
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const dogs = await getDogs();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-black">FETCH TAKEHOME</h1>
      <DogList dogs={dogs} />
    </div>
  );
}
