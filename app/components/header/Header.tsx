import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect to login page after successful logout
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-md w-full">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center md:items-start mb-3 md:mb-0">
          <h1 className="text-3xl font-bold text-white">Fetch</h1>
          <h2 className="text-sm md:text-base text-purple-100 font-medium">
            Find your new best friend!
          </h2>
        </div>

        {/* Navigation and Logout Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="bg-white text-purple-700 hover:bg-purple-100 px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
