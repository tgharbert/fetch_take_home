import { useMemo } from "react";
import DogCard from "./dogcard/DogCard";
import DogsNav from "./dogsnav/DogsNav";
import { ArrowLeft, ArrowDownZA, ArrowDownAZ } from "lucide-react";

export default function DogList({
  dogs,
  breedViewSelector,
  addToFavorites,
  setIsAlphaSort,
  isAlpha,
  handleNextPage,
  handlePrevPage,
  page,
}: {
  dogs: Dog[];
  breedViewSelector: (e: React.MouseEvent<HTMLButtonElement>) => void;
  addToFavorites: (dogId: string) => void;
  setIsAlphaSort: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isAlpha: boolean;
  handleNextPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handlePrevPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  page: number;
}) {
  const sortedDogs = useMemo(() => {
    return [...dogs].sort((a, b) =>
      a.breed.localeCompare(b.breed, "en", { sensitivity: "base" })
    );
  }, [dogs]);

  return (
    // <div className="w-1/2 mt-4">
    <div className=" mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <button
          onClick={(e) => breedViewSelector(e)}
          className="flex items-center bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200 font-medium hover:-translate-y-0.5 mr-4"
        >
          <ArrowLeft className="mr-1" />
          Back to Search Form
        </button>
        {/* FIX -- ABSTRACT INTO SEPARATE COMP */}
        <button
          onClick={(e) => setIsAlphaSort(e)}
          className="flex items-center bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md shadow-sm hover:shadow-md transition-all duration-200 font-medium hover:-translate-y-0.5 ml-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          <span className="mr-1.5">Sort By Breed:</span>
          {isAlpha ? (
            <ArrowDownZA className="h-4 w-4 text-orange-500" />
          ) : (
            <ArrowDownAZ className="h-4 w-4 text-orange-500" />
          )}
        </button>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0 justify-center flex">
        Available Dogs:
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-4">
        {sortedDogs.map((dog: Dog) => (
          <DogCard key={dog.id} dog={dog} addToFavorites={addToFavorites} />
        ))}
      </div>
      <DogsNav
        numOfDogs={dogs.length}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        page={page}
      />
    </div>
  );
}
