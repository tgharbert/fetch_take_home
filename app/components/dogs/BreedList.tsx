import BreedCard from "./BreedCard";

export default function DogList({
  breeds,
  handleBreedClick,
}: {
  breeds: string[];
  handleBreedClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    breed: string
  ) => void;
}) {
  return (
    <div>
      <h2>Dogs</h2>
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
