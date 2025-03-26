export default function DogList({ dogs }: { dogs: Dog[] }) {
  return (
    <div>
      <h2>Dogs</h2>
      <ul>
        {dogs.map((dog: Dog) => (
          <li key={dog.id}>{dog.name}</li>
        ))}
      </ul>
    </div>
  );
}
