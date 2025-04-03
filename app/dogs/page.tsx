"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DogList from "../components/dogs/DogList";
import Header from "../components/header/Header";
import SearchDogsForm from "../components/searchdogsform/SearchDogsForm";
// import getBoundingBox from "../utils/geo";
import useDogSearch from "../lib/hooks/useDogSearch";

export default function Dogs() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  // const [zips, setZips] = useState<string[]>([]);
  // const [error, setError] = useState<string | null>(null);
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(25);
  // const [loading, setLoading] = useState(true);
  // const [view, setView] = useState<string>("breeds");
  const [zip, setZip] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(50);
  // const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const { dogs, loading, error, view, searchDogs } = useDogSearch();
  // const router = useRouter();

  const handleSubmitSearch = (
    e: React.MouseEvent<HTMLButtonElement>,
    breeds: string[],
    zipCode: string | null,
    radius: number,
    minAge: number,
    maxAge: number
  ) => {
    searchDogs(e, selectedBreeds, zip, radius, minAge, maxAge);
  };

  const setUserRadius = (
    e: React.ChangeEvent<HTMLSelectElement>,
    radius: number
  ) => {
    e.preventDefault();
    setRadius(radius);
  };

  // a function for a user to set the zip code
  const setUserZip = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipCodeValue = e.target.value;

    if (!zipCodeValue) {
      setZip(null);
      // setError(null);
      return;
    }

    // Verify the zip code is valid
    const isValidZip = /^\d{5}(-\d{4})?$/.test(zipCodeValue);

    if (isValidZip) {
      setZip(zipCodeValue);
      // setError(null);
      // } else {
      // if (zipCodeValue.length >= 5) {
      //   setError("Please enter a valid 5-digit ZIP code.");
      // }
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
    // setLoading(true);
    // setDogs([]);
    // setLoading(false);
    // setView("breeds");
  };

  const addBreed = (e: React.MouseEvent<HTMLButtonElement>, breed: string) => {
    e.preventDefault();
    // setLoading(true);
    setSelectedBreeds((prev) => {
      if (prev.includes(breed)) {
        return prev;
      }
      return [...prev, breed];
    });
    // setLoading(false);
  };

  const removeBreed = (
    e: React.MouseEvent<HTMLButtonElement>,
    breed: string
  ) => {
    e.preventDefault();
    // setLoading(true);
    setSelectedBreeds((prev) => prev.filter((b) => b !== breed));
    // setLoading(false);
  };

  // const getZipsFromLocations = (locations: Location[]) => {
  //   const zips = locations.map((location) => location.zip_code);
  //   return zips;
  // };

  // const handleSubmitSearch = async (
  //   e: React.MouseEvent<HTMLButtonElement>,
  //   breed: string,
  //   zipCode: string | null,
  //   radius: number,
  //   minAge?: number,
  //   maxAge?: number
  // ) => {
  //   e.preventDefault();
  //   setView("dogs");
  //   setLoading(true);

  //   try {
  //     // Build query parameters
  //     const params = new URLSearchParams();

  //     // Add multiple breeds as repeated query parameters
  //     if (selectedBreeds && selectedBreeds.length > 0) {
  //       selectedBreeds.forEach((breed) => {
  //         params.append("breeds", breed);
  //       });
  //     }
  //     if (minAge !== undefined && minAge >= 0)
  //       params.append("minAge", minAge.toString());
  //     if (maxAge !== undefined && maxAge < Infinity)
  //       params.append("maxAge", maxAge.toString());

  //     // ensure that a zip is provided before adding radius
  //     if (radius && zipCode) {
  //       const geoRes = await fetch(`/api/locations/${zip}/`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify([zipCode]),
  //         credentials: "include",
  //       });
  //       if (geoRes.status === 401) {
  //         setLoading(false);
  //         router.push("/login");
  //         return;
  //       }
  //       if (!geoRes.ok) {
  //         setLoading(false);
  //         setError("Failed to fetch location");
  //         throw new Error("Network response was not ok");
  //       }
  //       const geoResData = await geoRes.json();
  //       // extract the lat and long data from the response
  //       const { latitude, longitude } = geoResData[0];
  //       const boundingBox = getBoundingBox(latitude, longitude, radius);

  //       // send this bounding box to the external API
  //       const geoSearchBody = {
  //         geoBoundingBox: {
  //           bottom_left: {
  //             lat: boundingBox.minLat,
  //             lon: boundingBox.minLon,
  //           },
  //           top_right: {
  //             lat: boundingBox.maxLat,
  //             lon: boundingBox.maxLon,
  //           },
  //         },
  //         // max size to get all the zips
  //         size: 10000,
  //       };

  //       const locSearch = await fetch(`/api/locations/search`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(geoSearchBody),
  //         credentials: "include",
  //       });
  //       if (locSearch.status === 401) {
  //         setLoading(false);
  //         router.push("/login");
  //         return;
  //       }
  //       if (!locSearch.ok) {
  //         setLoading(false);
  //         setError("Failed to fetch location");
  //         throw new Error("Network response was not ok");
  //       }

  //       const locSearchData = await locSearch.json();
  //       // FIX THIS
  //       const zipCodesFromGeobox = getZipsFromLocations(locSearchData.results);

  //       if (zipCodesFromGeobox && zipCodesFromGeobox.length > 0) {
  //         zipCodesFromGeobox.forEach((zipCode) => {
  //           params.append("zipCodes", zipCode);
  //         });
  //       }
  //     }

  //     // First API call - get dog IDs
  //     const queryString = params.toString() ? `?${params.toString()}` : "";

  //     const res = await fetch(`/api/dogs/search/${queryString}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });

  //     if (res.status === 401) {
  //       setLoading(false);
  //       router.push("/login");
  //       return;
  //     }

  //     if (!res.ok) {
  //       setLoading(false);
  //       setError("Failed to fetch dogs");
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await res.json();

  //     if (!data.resultIds || data.resultIds.length === 0) {
  //       setLoading(false);
  //       setDogs([]);
  //       return;
  //     }

  //     // Second API call - get dog details by IDs
  //     const response = await fetch(`/api/dogs/search`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data.resultIds),
  //       credentials: "include",
  //     });

  //     if (response.status === 401) {
  //       setLoading(false);
  //       router.push("/login");
  //       return;
  //     }

  //     if (!response.ok) {
  //       setLoading(false);
  //       setError("Failed to fetch dogs by IDs");
  //       throw new Error("Network response was not ok");
  //     }

  //     const dogsData = await response.json();
  //     setDogs(dogsData);
  //   } catch (error) {
  //     console.error(error);
  //     setError("An error occurred while fetching dogs");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
        // setError("Failed to fetch breeds");
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setBreeds(data);
      // setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  useEffect(() => {
    cachedBreeds();
    // setLoading(false);
  }, [cachedBreeds]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      {error && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}
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
            zip={zip}
            radius={radius}
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
