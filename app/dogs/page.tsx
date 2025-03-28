"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DogList from "../components/dogs/DogList";
import Header from "../components/header/Header";
import SearchDogsForm from "../components/searchdogsform/SearchDogsForm";
import getBoundingBox from "../utils/geo";

export default function Dogs() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(25);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<string>("breeds");
  const [zip, setZip] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(50);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const setUserRadius = (
    e: React.ChangeEvent<HTMLSelectElement>,
    radius: number
  ) => {
    e.preventDefault();
    setRadius(radius);
  };

  console.log("radius", radius);
  console.log("zip", zip);

  // a function for a user to set the zip code
  const setUserZip = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipCodeValue = e.target.value;

    // If the field is empty, clear the ZIP without showing an error
    if (!zipCodeValue) {
      setZip(null);
      setError(null);
      return;
    }

    // Verify the zip code is valid
    const isValidZip = /^\d{5}(-\d{4})?$/.test(zipCodeValue);

    if (isValidZip) {
      setZip(zipCodeValue);
      setError(null);
    } else {
      // Only set error if they've entered 5 or more digits
      // This prevents showing errors while they're still typing
      if (zipCodeValue.length >= 5) {
        setError("Please enter a valid 5-digit ZIP code.");
      }
    }
  };

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

  // FIX -- THIS FUNCTION IS A MESS -- WILL BE THE MAIN SUBMIT SEARCH FUNC -- FIX LATER
  // FIX -- NEED TO ADD THE ZIP TO THE API CALL, THIS WILL RETURN LAT AND LONG FOR THAT LOCATION
  // THEN I WILL USE THAT TO PERFORM CALC WITH THE RADIUS TO GET A RANGE OF LONG AND LATS
  // I WILL SEND THOSE AS PART OF A GEO BOUNDING BOX AND THAT WILL RETRIEVE ALL ZIPS
  // THEN I WILL ADD THE RETURNED ZIPS TO THE PARAMS OF THE DOG API CALL
  const handleSubmitSearch = async (
    e: React.MouseEvent<HTMLButtonElement>,
    breed: string,
    minAge?: number,
    maxAge?: number
  ) => {
    e.preventDefault();
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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="w-full max-w-6xl flex flex-col items-center justify-center gap-8">
        {/* FIX -- ABSTRACT INTO SEPARATE COMPONENT LATER */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700 mb-4"></div>
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
            setUserZip={setUserZip}
            setUserRadius={setUserRadius}
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
