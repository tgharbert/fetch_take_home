import React from "react";
import Searchbar from "../searchbar/Searchbar";
import BreedList from "../breeds/BreedList";
import SelectMinMaxAge from "../selectage/SelectMinMaxAge";

interface SearchDogsFormProps {
  breeds: string[];
  selectedBreeds: string[];
  addBreed: (e: React.MouseEvent<HTMLButtonElement>, breed: string) => void;
  removeBreed: (e: React.MouseEvent<HTMLButtonElement>, breed: string) => void;
  minAge: number;
  setMinAge: (age: number) => void;
  maxAge: number;
  setMaxAge: (age: number) => void;
  handleSubmitSearch: (
    e: React.MouseEvent<HTMLButtonElement>,
    breed: string,
    minAge?: number,
    maxAge?: number
  ) => void;
}

const SearchDogsForm: React.FC<SearchDogsFormProps> = ({
  breeds,
  selectedBreeds,
  addBreed,
  removeBreed,
  minAge,
  setMinAge,
  maxAge,
  setMaxAge,
  handleSubmitSearch,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full max-w-md mx-auto px-4">
        <Searchbar
          breeds={breeds}
          onSelectBreed={(breed) => {
            addBreed(new MouseEvent("click") as any, breed);
          }}
        />
        <div className="mt-4 mb-4">
          <BreedList
            selectedBreeds={selectedBreeds}
            removeBreed={removeBreed}
          />
        </div>
        <SelectMinMaxAge
          minAge={minAge}
          setMinAge={setMinAge}
          maxAge={maxAge}
          setMaxAge={setMaxAge}
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={(e) =>
            handleSubmitSearch(e, selectedBreeds[0], minAge, maxAge)
          }
          className={`bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-2.5 px-6 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50 transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out`}
        >
          SUBMIT SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchDogsForm;
