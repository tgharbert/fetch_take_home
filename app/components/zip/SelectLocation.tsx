export default function SelectLocation({
  setUserZip,
  setUserRadius,
  radius,
  zip,
}: {
  setUserZip: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setUserRadius: (
    e: React.ChangeEvent<HTMLSelectElement>,
    radius: number
  ) => void;
  radius: number;
  zip: string | null;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-full mt-2 border border-gray-100">
      <h2 className="font-semibold text-xl text-gray-800 mb-4 justify-center flex">
        Location Settings:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label
            htmlFor="radius"
            className="text-sm text-gray-700 font-medium mb-1"
          >
            Search Radius
          </label>
          <select
            id="radius"
            name="radius"
            onChange={(e) => setUserRadius(e, Number(e.target.value))}
            value={radius}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
            required
          >
            <option value="5">5 miles</option>
            <option value="10">10 miles</option>
            <option value="25">25 miles</option>
            <option value="50">50 miles</option>
            <option value="100">100 miles</option>
          </select>
        </div>

        {/* Zip code input group */}
        <div className="flex flex-col">
          <label
            htmlFor="zip"
            className="text-sm text-gray-700 font-medium mb-1"
          >
            ZIP Code
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            placeholder="Enter ZIP Code"
            value={zip || ""}
            onChange={setUserZip}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
            maxLength={5}
          />
        </div>
      </div>
    </div>
  );
}
