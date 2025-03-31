export default function SelectLocation({
  setUserZip,
  setUserRadius,
}: {
  setUserZip: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setUserRadius: (
    e: React.ChangeEvent<HTMLSelectElement>,
    radius: number
  ) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-full mt-4 border border-gray-100">
      <h2 className="font-semibold text-lg text-gray-800 mb-4">
        Location Settings
      </h2>
      {/* <form onSubmit={setUserZip} className="w-full"> */}
      {/* Grid layout for side-by-side inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Radius selection group */}
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
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
            required
            defaultValue={"50"}
          >
            <option value="5">5 miles</option>
            <option value="10">10 miles</option>
            <option value="25">25 miles</option>
            <option value="50">50 miles</option>
            <option value="100">100 miles</option>
            <option value="250">250 miles</option>
            <option value="500">500 miles</option>
            <option value="8000">Anywhere</option>
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
            onChange={setUserZip}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
            maxLength={5}
          />
        </div>
      </div>

      {/* Submit button centered below */}
      {/* <div className="flex justify-center mt-2">
        <button
          type="submit"
          className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-medium py-2 px-6 rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
        >
          Set Location
        </button>
      </div> */}
      {/* </form> */}
    </div>
  );
}
