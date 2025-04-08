import BreedCard from "./BreedCard";

export default function DogList({
  selectedBreeds,
  removeBreed,
}: {
  selectedBreeds: string[];
  removeBreed: (e: React.MouseEvent<HTMLButtonElement>, breed: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full mt-2 border border-gray-100">
      <h2 className="font-semibold text-xl text-gray-800 mb-4 justify-center flex">
        Selected Breeds:
      </h2>
      <div className="mx-2"></div>
      <ul className="overflow-y-auto max-h-20">
        {selectedBreeds.length === 0 ? (
          <i className="flex align-middle justify-center text-center text-gray-500 mt-4">
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
