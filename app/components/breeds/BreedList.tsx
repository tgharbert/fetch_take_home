import BreedCard from "./BreedCard";

export default function DogList({
  breeds,
  handleBreedClick,
  orderBreedsDesc,
  orderBreedsAsc,
}: {
  breeds: string[];
  handleBreedClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    breed: string
  ) => void;
  orderBreedsDesc: (e: React.MouseEvent<HTMLButtonElement>) => void;
  orderBreedsAsc: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-2xl align-middle">Dogs</h2>
      <div className="mx-2">
        <button
          className="bg-purple-500 text-white font-bold py-2 px-4 rounded-md mx-2"
          onClick={(e) => orderBreedsAsc(e)}
        >
          Order Asc
        </button>
        <button
          className="bg-purple-500 text-white font-bold py-2 px-4 rounded-md mx-2"
          onClick={(e) => orderBreedsDesc(e)}
        >
          Order Desc
        </button>
      </div>

      <ul>
        {breeds.map((breed: string) => (
          <li key={breed}>
            <BreedCard breed={breed} handleBreedClick={handleBreedClick} />
          </li>
        ))}
      </ul>
    </div>
  );
}
