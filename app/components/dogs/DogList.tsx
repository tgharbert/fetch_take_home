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
      <div className="grid grid-cols-2 gap-4">
        {dogs.map((dog: Dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>
    </div>
  );
}
