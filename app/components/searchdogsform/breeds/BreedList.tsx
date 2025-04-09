import BreedCard from "./BreedCard";
import Searchbar from "../searchbar/Searchbar";

export default function DogList({
  selectedBreeds,
  removeBreed,
  breeds,
  addBreed,
}: {
  breeds: string[];
  addBreed: (
    e: React.MouseEvent<HTMLButtonElement> | null,
    breed: string
  ) => void;
  selectedBreeds: string[];
  removeBreed: (e: React.MouseEvent<HTMLButtonElement>, breed: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full mt-2 border border-gray-100">
      <Searchbar
        breeds={breeds}
        onSelectBreed={(breed: string) => {
          addBreed(null, breed);
        }}
      />
      <h2 className="font-semibold text-xl text-gray-800 mb-1 justify-center flex mt-2">
        Selected Breeds:
      </h2>
      <ul className="overflow-y-auto max-h-20">
        {selectedBreeds.length === 0 ? (
          <i className="flex align-middle justify-center text-center text-gray-500 ">
            No breeds selected
          </i>
        ) : (
          <div className="flex flex-wrap gap-1">
            {selectedBreeds.map((breed: string) => (
              <div key={breed} className="inline-block">
                <BreedCard breed={breed} removeBreed={removeBreed} />
              </div>
            ))}
          </div>
        )}
      </ul>
    </div>
  );
}
