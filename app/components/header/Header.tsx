import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react"; // Import Lucide icons
import Image from "next/image";

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
    <header className="bg-purple-700 shadow-lg w-full sticky top-0 z-50">
      <div className=" mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-3 md:mb-0">
          <Image
            src="/FetchTH_fullsize.png"
            className="mr-2"
            alt="Fetch Logo"
            width={50}
            height={50}
            priority
          />
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Fetch
            </h1>
            <h2 className="text-sm text-purple-200 font-medium -mt-1">
              Find your new best friend!
            </h2>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center hover:-translate-y-0.5 backdrop-blur-sm"
        >
          <LogOut className="h-5 w-5 mr-1.5" />
          Logout
        </button>
      </div>
    </header>
  );
}
