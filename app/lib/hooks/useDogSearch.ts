import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import getBoundingBox from "@/app/utils/geo";

export default function useDogSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [from, setFrom] = useState<number>(0);
  const router = useRouter();

  const searchParamsRef = useRef({
    selectedBreeds: [] as string[],
    zipCode: null as string | null,
    radius: 25 as number | null,
    minAge: 0,
    maxAge: 25,
    isAlpha: true,
  });

  const fetchLocationByZip = async (zipCode: string) => {
    const response = await fetch(`../../api/locations/${zipCode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 401) {
      router.push("/login");
      return;
    }
    if (!response.ok) {
      setError("Failed to fetch location");
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (!data || data.length === 0) {
      setError("No location found");
      return;
    }
    return data[0];
  };

  const fetchZipCodesInRadius = async (coords: Coordinates, radius: number) => {
    const boundingBox = getBoundingBox(coords.lat, coords.lon, radius);

    const geoSearchBody = {
      geoBoundingBox: {
        bottom_left: {
          lat: boundingBox.minLat,
          lon: boundingBox.minLon,
        },
        top_right: {
          lat: boundingBox.maxLat,
          lon: boundingBox.maxLon,
        },
      },
      // FIX -- grab them all
      size: 10000,
    };
    const locSearch = await fetch(`../../api/locations/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(geoSearchBody),
      credentials: "include",
    });
    if (locSearch.status === 401) {
      router.push("/login");
      return;
    }
    if (!locSearch.ok) {
      setError("Failed to fetch location");
      throw new Error("Network response was not ok");
    }
    const locSearchData = await locSearch.json();

    if (!locSearchData || locSearchData.results.length === 0) {
      setError("Error searching for locations");
      return;
    }
    const zipCodes = locSearchData.results.map(
      (location: Location) => location.zip_code
    );
    return zipCodes;
  };

  const resetPage = () => {
    setFrom(0);
    setDogs([]);
    setLoading(false);
    setError(null);
    searchParamsRef.current = {
      selectedBreeds: [] as string[],
      zipCode: null as string | null,
      radius: 25 as number | null,
      minAge: 0,
      maxAge: 25,
      isAlpha: true,
    };
  };

  const fetchDogIds = async (params: URLSearchParams) => {
    const queryString = params.toString();
    const response = await fetch(`../../api/dogs/search?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 401) {
      router.push("/login");
      return;
    }
    if (!response.ok) {
      setError("Failed to fetch dog IDs");
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (!data || data.length === 0) {
      setError("No dogs found");
      return;
    }
    return data;
  };

  const fetchDogDetails = async (dogIds: string[]) => {
    const response = await fetch("../../api/dogs/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dogIds),
      credentials: "include",
    });
    if (response.status === 401) {
      router.push("/login");
      return;
    }
    if (!response.ok) {
      setError("Failed to fetch dog details");
      throw new Error("Network response was not ok");
    }
    const dogsData = await response.json();
    if (!dogsData || dogsData.length === 0) {
      setError("No dogs were found");
      return;
    }
    return dogsData;
  };

  const fetchPrevPage = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    const searchSize = 25;
    setLoading(true);
    setError(null);
    try {
      const { selectedBreeds, zipCode, radius, minAge, maxAge, isAlpha } =
        searchParamsRef.current;
      const params = new URLSearchParams();
      if (selectedBreeds && selectedBreeds.length > 0) {
        selectedBreeds.forEach((breed) => {
          params.append("breeds", breed);
        });
      }
      let prevFrom = from - 25;
      if (from - searchSize < 0) {
        prevFrom = 0;
      }
      params.append("minAge", minAge.toString());
      params.append("maxAge", maxAge.toString());
      params.append("from", prevFrom.toString());
      if (isAlpha) {
        params.append("sort", "breed:asc");
      } else {
        params.append("sort", "breed:desc");
      }
      if (zipCode && radius) {
        const location: Location = await fetchLocationByZip(zipCode);
        if (!location) return;
        const coords: Coordinates = {
          lat: location.latitude,
          lon: location.longitude,
        };
        const zips = await fetchZipCodesInRadius(coords, radius);
        if (!zips) return;
        zips.forEach((zip: string) => {
          params.append("zipCodes", zip);
        });
      }
      const dogIdsReturn = await fetchDogIds(params);
      if (!dogIdsReturn) return;
      const dogsData = await fetchDogDetails(dogIdsReturn.resultIds);
      if (!dogsData) return;
      setDogs(dogsData);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch dogs");
      console.error("Error fetching dogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPage = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { selectedBreeds, zipCode, radius, minAge, maxAge, isAlpha } =
        searchParamsRef.current;

      const params = new URLSearchParams();
      if (selectedBreeds && selectedBreeds.length > 0) {
        selectedBreeds.forEach((breed) => {
          params.append("breeds", breed);
        });
      }
      const nextFrom = from + 25;
      params.append("minAge", minAge.toString());
      params.append("maxAge", maxAge.toString());
      params.append("from", nextFrom.toString());

      if (isAlpha) {
        params.append("sort", "breed:asc");
      } else {
        params.append("sort", "breed:desc");
      }

      if (zipCode && radius) {
        const location: Location = await fetchLocationByZip(zipCode);
        if (!location) return;

        const coords: Coordinates = {
          lat: location.latitude,
          lon: location.longitude,
        };
        const zips = await fetchZipCodesInRadius(coords, radius);
        if (!zips) return;

        zips.forEach((zip: string) => {
          params.append("zipCodes", zip);
        });
      }

      const dogIdsReturn = await fetchDogIds(params);

      if (!dogIdsReturn) return;
      const dogsData = await fetchDogDetails(dogIdsReturn.resultIds);
      if (!dogsData) return;
      setDogs(dogsData);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch dogs");
      console.error("Error fetching dogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchDogs = async (
    e: React.FormEvent,
    selectedBreeds: string[],
    zipCode: string | null,
    radius: number | null,
    minAge: number,
    maxAge: number,
    isAlpha: boolean
  ) => {
    setLoading(true);
    setError(null);
    e.preventDefault();

    searchParamsRef.current = {
      selectedBreeds,
      zipCode,
      radius,
      minAge,
      maxAge,
      isAlpha,
    };

    try {
      const params = new URLSearchParams();
      if (selectedBreeds && selectedBreeds.length > 0) {
        selectedBreeds.forEach((breed) => {
          params.append("breeds", breed);
        });
      }
      params.append("minAge", minAge.toString());
      params.append("maxAge", maxAge.toString());
      params.append("from", from.toString());

      if (isAlpha) {
        params.append("sort", "breed:asc");
      } else {
        params.append("sort", "breed:desc");
      }

      if (zipCode && radius) {
        const location: Location = await fetchLocationByZip(zipCode);
        if (!location) return;

        const coords: Coordinates = {
          lat: location.latitude,
          lon: location.longitude,
        };
        const zips = await fetchZipCodesInRadius(coords, radius);
        if (!zips) return;

        zips.forEach((zip: string) => {
          params.append("zipCodes", zip);
        });
      }

      const dogIdsReturn = await fetchDogIds(params);

      if (!dogIdsReturn) return;
      const dogsData = await fetchDogDetails(dogIdsReturn.resultIds);
      if (!dogsData) return;
      setDogs(dogsData);
      // setFrom((prev) => prev + size);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch dogs");
      console.error("Error fetching dogs:", error);
    } finally {
      setLoading(false);
    }
  };
  return {
    dogs,
    loading,
    error,
    searchDogs,
    fetchNextPage,
    fetchPrevPage,
    resetPage,
  };
}
