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
    <div className="bg-white rounded-lg shadow-md p-4 w-full mt-4 border border-gray-100">
      <h2 className="font-semibold text-lg text-gray-800 mb-4 text-center">
        Age Range:
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Min Age Selector */}
        <div className="flex flex-col">
          <label
            htmlFor="min-age"
            className="text-sm text-gray-600 mb-1 font-medium"
          >
            Minimum Age
          </label>
          <div className="relative">
            <input
              type="number"
              id="min-age"
              min="0"
              max="25"
              value={minAge}
              onChange={(e) => setMinAge(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-200"
            />
            <span className="ml-2 -translate-y-1/2 text-gray-500 text-sm">
              yrs
            </span>
          </div>
        </div>

        {/* Max Age Selector */}
        <div className="flex flex-col">
          <label
            htmlFor="max-age"
            className="text-sm text-gray-600 mb-1 font-medium"
          >
            Maximum Age
          </label>
          <div className="relative">
            <input
              type="number"
              id="max-age"
              min="0"
              max="25"
              value={maxAge}
              onChange={(e) => setMaxAge(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-200"
            />
            <span className="ml-2 -translate-y-1/2 text-gray-500 text-sm">
              yrs
            </span>
          </div>
        </div>
      </div>

      {/* Range Display */}
      {/* FIX -- THIS ISN'T REFLECTING PROPERLY WHEN CHANGING BOTH MIN AND MAX */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-400 to-orange-500 h-full"
            style={{
              width: `${(Math.min(maxAge, 25) / 25) * 100}%`,
              marginLeft: `${(Math.min(minAge, 25) / 25) * 100}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>25</span>
        </div>
      </div>

      {/* Age Error Message (optional) */}
      {minAge > maxAge && (
        <p className="text-red-500 text-xs mt-2 text-center">
          Minimum age should be less than maximum age
        </p>
      )}
    </div>
  );
}
