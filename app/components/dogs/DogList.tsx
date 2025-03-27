import DogCard from "./DogCard";

export default function DogList({
  dogs,
  breedViewSelector,
}: {
  dogs: Dog[];
  breedViewSelector: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div>
      <h2>Dogs: </h2>
      <button className="bg-orange-400 " onClick={(e) => breedViewSelector(e)}>
        Back to Breeds
      </button>
      <ul>
        {dogs.map((dog: Dog) => (
          <li key={dog.id}>
            <DogCard dog={dog} />
          </li>
        ))}
      </ul>
    </div>
  );
}
