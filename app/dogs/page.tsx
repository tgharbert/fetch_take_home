"use client";

import React, { useEffect, useState, useCallback } from "react";
import BreedList from "../components/breeds/BreedList";
import { useRouter } from "next/navigation";
import DogList from "../components/dogs/DogList";

export default function Dogs() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<string>("breeds");
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);

  const router = useRouter();

  const breedViewSelector = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setDogs([]);
    setSelectedBreed(null);
    setLoading(false);
    setView("breeds");
  };

  const orderBreedsDesc = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const sortedBreeds = [...breeds].sort((a, b) => b.localeCompare(a));
    setBreeds(sortedBreeds);
    setLoading(false);
  };

  const orderBreedsAsc = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const sortedBreeds = [...breeds].sort((a, b) => a.localeCompare(b));
    setBreeds(sortedBreeds);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedBreed) {
      setLoading(true);
      const fetchDogs = async () => {
        try {
          const res = await fetch(`/api/dogs/${selectedBreed}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          if (res.status === 401) {
            setLoading(false);
            router.push("/login");
          }
          if (!res.ok) {
            setLoading(false);
            setError("Failed to fetch dogs");
            throw new Error("Network response was not ok");
          }
          // const data = await res.json();
          // send data.resultIds to post route for fetching dog
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchDogs();
    }
  }, [selectedBreed, router]);

  const handleBreedClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    breed: string
  ) => {
    e.preventDefault(); // Prevent default behavior if needed
    setSelectedBreed(breed);
    setView("dogs");
    try {
      const res = await fetch(`/api/dogs/${breed}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 401) {
        router.push("/login");
      }
      if (!res.ok) {
        setError("Failed to fetch dogs");
        throw new Error("Network response was not ok");
      }
      const data = await res.json();

      const response = await fetch(`/api/dogs/${breed}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.resultIds),
        credentials: "include",
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }
      if (!response.ok) {
        setError("Failed to fetch dogs by IDs");
        throw new Error("Network response was not ok");
      }

      const dogsData = await response.json();
      setLoading(false);
      setView("dogs");
      setDogs(dogsData);
    } catch (error) {
      console.error(error);
    }
  };

  const cachedBreeds = useCallback(async () => {
    try {
      const res = await fetch(`/api/breeds`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 401) {
        router.push("/login");
      }
      if (!res.ok) {
        // FIX THE ERROR MESSAGE/HANDLING LATER
        setError("Failed to fetch breeds");
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setBreeds(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  useEffect(() => {
    cachedBreeds();
    setLoading(false);
  }, [cachedBreeds]);

  // THE CONDITIONAL RENDER IS A MESS HERE!!!!! -- FIX LATER
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-black">FETCH TAKEHOME</h1>
      {/* FIX -- ABSTRACT INTO SEPARATE COMPONENT LATER */}
      {loading && (
        <div className="flex justify-center items-center">
          <p className="text-black">Loading...</p>
        </div>
      )}
      {error ? (
        // FIX -- ABSTRACT INTO SEPARATE COMPONENT LATER
        <div className="flex justify-center items-center">
          {/* FIX THIS ERROR MESSAGE/HANDLING LATER */}
          <p className="text-black">Error: {error}</p>
        </div>
      ) : view === "dogs" ? (
        <DogList dogs={dogs} breedViewSelector={breedViewSelector} />
      ) : (
        <BreedList
          breeds={breeds}
          handleBreedClick={handleBreedClick}
          orderBreedsDesc={orderBreedsDesc}
          orderBreedsAsc={orderBreedsAsc}
        />
      )}
    </div>
  );
}
