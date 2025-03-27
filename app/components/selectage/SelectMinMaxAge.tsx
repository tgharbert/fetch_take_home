export default function SelectMinMaxAge({
  minAge,
  setMinAge,
  maxAge,
  setMaxAge,
}: {
  minAge: number;
  setMinAge: (age: number) => void;
  maxAge: number;
  setMaxAge: (age: number) => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-2xl align-middle">Select Age</h2>
      <div className="flex flex-row">
        <label htmlFor="min-age" className="mr-2">
          Min Age:
        </label>
        <input
          type="number"
          id="min-age"
          value={minAge}
          onChange={(e) => setMinAge(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-1"
        />
      </div>
      <div className="flex flex-row">
        <label htmlFor="max-age" className="mr-2">
          Max Age:
        </label>
        <input
          type="number"
          id="max-age"
          value={maxAge}
          onChange={(e) => setMaxAge(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-1"
        />
      </div>
    </div>
  );
}
