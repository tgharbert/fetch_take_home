/**
 * Service layer for dog-related API calls
 */

// Fetch all dog breeds
export const fetchBreeds = async () => {
  const response = await fetch("/api/breeds", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch breeds: ${response.status}`);
  }

  return response.json();
};

// Fetch dogs by breed
export const fetchDogsByBreed = async (breed: string) => {
  const response = await fetch(`/api/dogs/${breed}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch dogs for breed ${breed}: ${response.status}`
    );
  }

  return response.json();
};

// Fetch dog details by array of IDs
export const fetchDogsByIds = async (breedName: string, dogIds: string[]) => {
  const response = await fetch(`/api/dogs/${breedName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogIds),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dogs by IDs: ${response.status}`);
  }

  return response.json();
};
