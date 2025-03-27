import BreedCard from "./BreedCard";

export default function DogList({
  selectedBreeds,
  removeBreed,
}: {
  selectedBreeds: string[];
  removeBreed: (e: React.MouseEvent<HTMLButtonElement>, breed: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full mt-4 border border-gray-100">
      <h2 className="font-bold text-2xl align-middle">Selected Breeds:</h2>
      <div className="mx-2"></div>
      <ul>
        {selectedBreeds.map((breed: string) => (
          <li key={breed}>
            <BreedCard breed={breed} removeBreed={removeBreed} />
          </li>
        ))}
      </ul>
    </div>
  );
}
