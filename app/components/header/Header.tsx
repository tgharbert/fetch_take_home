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
    <header className="flex flex-col items-center justify-center bg-purple-400 text-white p-4 w-full">
      <h1 className="text-3xl font-bold">Fetch</h1>
      <h2 className="text-xl font-semibold">Find your new best friend!</h2>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
