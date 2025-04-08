"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DogList from "../components/dogslist/DogList";
import Header from "../components/header/Header";
import SearchDogsForm from "../components/searchdogsform/SearchDogsForm";
import useDogSearch from "../lib/hooks/useDogSearch";
import Loading from "../components/loading/Loading";

export default function Dogs() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(25);
  const [view, setView] = useState<string>("breeds");
  const [zip, setZip] = useState<string | null>(null);
  const [isAlpha, setIsAlpha] = useState<boolean>(true);
  const [radius, setRadius] = useState<number>(25);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  const handleNextPage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
    fetchNextPage(e);
  };

  const handlePrevPage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage((prev) => prev - 1);
    fetchPrevPage(e);
  };

  // FIX -- MOVE LOADING TO THIS LEVEL - OUT OF THE HOOK
  const submitFavorites = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(favorites),
      });
      if (res.status === 401) {
        router.push("/login");
      }
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      // redirect to the match page with the ID of the dog
      router.push(`/match/${data.match}`);
    } catch (error) {
      console.error(error);
    }
  };

  // custom hook to fetch dogs - look in lib/hooks/useDogSearch.ts
  const {
    dogs,
    loading,
    error,
    searchDogs,
    fetchNextPage,
    fetchPrevPage,
    resetPage,
  } = useDogSearch();

  const handleSubmitSearch = (
    e: React.MouseEvent<HTMLButtonElement>,
    breeds: string[],
    zipCode: string | null,
    radius: number,
    minAge: number,
    maxAge: number,
    isAlpha: boolean
  ) => {
    setView("dogs");
    setPage(1);
    searchDogs(e, selectedBreeds, zip, radius, minAge, maxAge, isAlpha);
  };

  const setUserRadius = (
    e: React.ChangeEvent<HTMLSelectElement>,
    radius: number
  ) => {
    e.preventDefault();
    setRadius(radius);
  };

  const setIsAlphaSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // establishing a new var avoids state race conditions when user clicks the button
    setIsAlpha((prev) => {
      const newOrder = !prev;
      searchDogs(e, selectedBreeds, zip, radius, minAge, maxAge, newOrder);
      return newOrder;
    });
  };

  const setUserZip = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipCodeValue = e.target.value;
    if (!zipCodeValue) {
      setZip(null);
      return;
    }
    // Verify the zip code is valid
    if (/^\d*$/.test(zipCodeValue)) {
      setZip(zipCodeValue);
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
    resetPage();
    setView("breeds");
  };

  const addBreed = (e: React.MouseEvent<HTMLButtonElement>, breed: string) => {
    e.preventDefault();
    setSelectedBreeds((prev) => {
      if (prev.includes(breed)) {
        return prev;
      }
      return [...prev, breed];
    });
  };

  const removeBreed = (
    e: React.MouseEvent<HTMLButtonElement>,
    breed: string
  ) => {
    e.preventDefault();
    setSelectedBreeds((prev) => prev.filter((b) => b !== breed));
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
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setBreeds(data);
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  useEffect(() => {
    cachedBreeds();
  }, [cachedBreeds]);

  return (
    <div className="flex flex-col min-h-screen w-full align-middle bg-orange-100">
      <Header />
      {error && (
        // FIX -- ABSTRACT INTO SEPARATE ERROR COMPONENT LATER
        <div className="flex flex-col items-center justify-center">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}
      <main className="w-full flex flex-col items-center justify-center ">
        {favorites.length > 0 && (
          <div>
            <button
              onClick={(e) => submitFavorites(e)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit Favorites
            </button>
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center h-[calc(100vh-100px)]">
            <Loading />
          </div>
        ) : view === "dogs" ? (
          <DogList
            dogs={dogs}
            breedViewSelector={breedViewSelector}
            addToFavorites={addToFavorites}
            setIsAlphaSort={setIsAlphaSort}
            isAlpha={isAlpha}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            page={page}
          />
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-100px)]">
            <SearchDogsForm
              breeds={breeds}
              setUserZip={setUserZip}
              setUserRadius={setUserRadius}
              selectedBreeds={selectedBreeds}
              addBreed={addBreed}
              zip={zip}
              radius={radius}
              removeBreed={removeBreed}
              minAge={minAge}
              setMinAge={setMinAge}
              maxAge={maxAge}
              setMaxAge={setMaxAge}
              isAlpha={isAlpha}
              handleSubmitSearch={handleSubmitSearch}
            />
          </div>
        )}
      </main>
    </div>
  );
}
