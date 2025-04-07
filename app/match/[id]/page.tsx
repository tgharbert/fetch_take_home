import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MatchPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = await cookies();
  const userSession = cookieStore.get("fetch-access-token");

  // redirect to login if no session
  if (!userSession) {
    redirect("/login");
  }

  const getMatch = async (id: string) => {
    const cookieHeader = `fetch-access-token=${userSession.value}`;
    try {
      const response = await fetch(`${process.env.BASE_URL}/dogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieHeader,
        },
        body: JSON.stringify([id]), // Send the array directly as the body
        credentials: "include", // Forward cookies for auth
      });

      if (!response.ok) {
        console.error("Failed to fetch dog details");
        return;
      }
      // Return the data from the external API
      const dogs = await response.json();
      return dogs;
    } catch (error) {
      console.error("Error fetching dog details:", error);
      return;
    }
  };

  const { id } = await params;

  // get the id from the URL
  const matchDog = await getMatch(id); // Replace with actual ID
  console.log("Match Dog: ", matchDog[0]);

  return (
    <div>
      <h1>Match Page</h1>
      <p>Here you will see the match</p>
      {/* FIX -- ADD DOG MATCHING COMPONENT HERE */}
      {/* <DogMatch /> */}
    </div>
  );
}
