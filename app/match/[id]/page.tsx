import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function MatchPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = await cookies();
  const userSession = cookieStore.get("fetch-access-token");

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
        body: JSON.stringify([id]),
        credentials: "include",
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
  const matchDog = await getMatch(id);

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100 p-4">
      {/* // <div className="flex flex-col min-h-screen w-full align-middle bg-orange-100"> */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-md w-full transition-all duration-300 hover:shadow-xl border border-gray-100">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
            Perfect Match!
          </h1>
          <p className="text-center text-gray-500 text-sm mb-6">
            We found your ideal companion
          </p>

          <div className="flex justify-center mb-6">
            <div className="relative h-64 w-64 rounded-lg overflow-hidden border-4 border-purple-400">
              <Image
                src={matchDog[0].img}
                alt={matchDog[0].name}
                fill
                className="object-cover"
                sizes="256px"
                priority
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-center text-orange-600 mb-4">
            {matchDog[0].name}
          </h2>

          <div className="space-y-3 mb-6">
            <div className="flex items-center bg-gray-50 rounded-lg p-3">
              <span className="text-gray-500 font-medium w-20">Breed:</span>
              <span className="text-gray-800 font-medium">
                {matchDog[0].breed}
              </span>
            </div>
            <div className="flex items-center bg-gray-50 rounded-lg p-3">
              <span className="text-gray-500 font-medium w-20">Age:</span>
              <span className="text-gray-800 font-medium">
                {matchDog[0].age} years
              </span>
            </div>
            <div className="flex items-center bg-gray-50 rounded-lg p-3">
              <span className="text-gray-500 font-medium w-20">Zip Code:</span>
              <span className="text-gray-800 font-medium">
                {matchDog[0].zip_code}
              </span>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-md hover:shadow-lg">
              Adopt Me Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
