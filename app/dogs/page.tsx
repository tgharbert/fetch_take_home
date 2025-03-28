"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DogList from "../components/dogs/DogList";
import Header from "../components/header/Header";
import SearchDogsForm from "../components/searchdogsform/SearchDogsForm";

export default function Dogs() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(25);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<string>("breeds");
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const addToFavorites = (dogId: string) => {
    setFavorites((prev) => {
      if (prev.includes(dogId)) {
        return prev;
      }
      return [...prev, dogId];
    });
  };

  const router = useRouter();

  const breedViewSelector = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setDogs([]);
    setSelectedBreed(null);
    setLoading(false);
    setView("breeds");
  };

  const addBreed = (e: React.MouseEvent<HTMLButtonElement>, breed: string) => {
    e.preventDefault();
    setLoading(true);
    setSelectedBreeds((prev) => {
      if (prev.includes(breed)) {
        return prev;
      }
      return [...prev, breed];
    });
    setLoading(false);
  };

  const removeBreed = (
    e: React.MouseEvent<HTMLButtonElement>,
    breed: string
  ) => {
    e.preventDefault();
    setLoading(true);
    setSelectedBreeds((prev) => prev.filter((b) => b !== breed));
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

  // FIX -- THIS FUNCTION IS A MESS -- WILL BE THE MAIN SUBMIT SEARCH FUNC -- FIX LATER
  const handleSubmitSearch = async (
    e: React.MouseEvent<HTMLButtonElement>,
    breed: string,
    minAge?: number,
    maxAge?: number
  ) => {
    e.preventDefault();
    setSelectedBreed(breed);
    setView("dogs");
    setLoading(true);

    try {
      // Build query parameters
      const params = new URLSearchParams();

      // Add multiple breeds as repeated query parameters
      if (selectedBreeds && selectedBreeds.length > 0) {
        selectedBreeds.forEach((breed) => {
          params.append("breeds", breed);
        });
      }
      if (minAge !== undefined && minAge >= 0)
        params.append("minAge", minAge.toString());
      if (maxAge !== undefined && maxAge < Infinity)
        params.append("maxAge", maxAge.toString());

      // First API call - get dog IDs
      const queryString = params.toString() ? `?${params.toString()}` : "";
      const res = await fetch(`/api/dogs/search/${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 401) {
        setLoading(false);
        router.push("/login");
        return;
      }

      if (!res.ok) {
        setLoading(false);
        setError("Failed to fetch dogs");
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      if (!data.resultIds || data.resultIds.length === 0) {
        setLoading(false);
        setDogs([]);
        return;
      }

      // Second API call - get dog details by IDs
      const response = await fetch(`/api/dogs/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.resultIds),
        credentials: "include",
      });

      if (response.status === 401) {
        setLoading(false);
        router.push("/login");
        return;
      }

      if (!response.ok) {
        setLoading(false);
        setError("Failed to fetch dogs by IDs");
        throw new Error("Network response was not ok");
      }

      const dogsData = await response.json();

      setDogs(dogsData);
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching dogs");
    } finally {
      setLoading(false);
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
      <Header />
      <main className="w-full max-w-6xl flex flex-col items-center justify-center gap-8">
        {/* FIX -- ABSTRACT INTO SEPARATE COMPONENT LATER */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Loading...</p>
          </div>
        ) : view === "dogs" ? (
          <DogList
            dogs={dogs}
            breedViewSelector={breedViewSelector}
            addToFavorites={addToFavorites}
          />
        ) : (
          <SearchDogsForm
            breeds={breeds}
            selectedBreeds={selectedBreeds}
            addBreed={addBreed}
            removeBreed={removeBreed}
            minAge={minAge}
            setMinAge={setMinAge}
            maxAge={maxAge}
            setMaxAge={setMaxAge}
            handleSubmitSearch={handleSubmitSearch}
          />
        )}
      </main>
    </div>
  );
}
