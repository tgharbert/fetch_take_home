import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  fetchBreeds,
  fetchDogsByBreed,
  fetchDogsByIds,
} from "../services/dogApi";

export const useBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadBreeds = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchBreeds();
      setBreeds(data);
    } catch (error: Error | any) {
      console.error("Error fetching breeds:", error);
      setError("Failed to fetch breeds");
      if (error.message.includes("401")) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadBreeds();
  }, [loadBreeds]);

  return { breeds, loading, error, refreshBreeds: loadBreeds };
};

export const useDogsByBreed = (selectedBreed: string | null) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchDogs = useCallback(
    async (breed: string) => {
      if (!breed) return;

      setLoading(true);
      try {
        // First get the dog IDs for the selected breed
        const breedData = await fetchDogsByBreed(breed);

        // Then fetch the full dog details using those IDs
        if (breedData.resultIds && Array.isArray(breedData.resultIds)) {
          const dogsData = await fetchDogsByIds(breed, breedData.resultIds);
          setDogs(dogsData);
        }
      } catch (error: Error | any) {
        console.error("Error fetching dogs:", error);
        setError("Failed to fetch dogs");
        if (error.message.includes("401")) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    if (selectedBreed) {
      fetchDogs(selectedBreed);
    }
  }, [selectedBreed, fetchDogs]);

  return { dogs, loading, error, fetchDogs };
};
