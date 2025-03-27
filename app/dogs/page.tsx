"use client";

import { useEffect, useState } from "react";
import BreedList from "../components/dogs/BreedList";

export default function Dogs() {
  const [breeds, setBreeds] = useState([]);
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBreeds = async () => {
    try {
      const data = await fetch(`/api/breeds`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!data.ok) {
        // HANDLE ERROR IN DOM
        throw new Error("Network response was not ok");
      }
      const res = await data.json();
      setBreeds(res);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBreeds();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-black">FETCH TAKEHOME</h1>
      {loading && (
        <div className="flex justify-center items-center">
          <p className="text-black">Loading...</p>
        </div>
      )}
      <BreedList breeds={breeds} />
    </div>
  );
}
