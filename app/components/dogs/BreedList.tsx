import BreedCard from "./BreedCard";

export default function DogList({ breeds }: { breeds: string[] }) {
  return (
    <div>
      <h2>Dogs</h2>
      <ul>
        {breeds.map((breed: string) => (
          <li key={breed}>
            <BreedCard breed={breed} />
          </li>
        ))}
      </ul>
    </div>
  );
}
