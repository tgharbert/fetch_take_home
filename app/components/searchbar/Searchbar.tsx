export default function Searchbar() {
  return (
    <form className="flex w-full max-w-md mx-auto">
      <div className="relative flex items-center w-full">
        <input
          type="text"
          id="search"
          placeholder="Search breeds..."
          className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          className="absolute right-0 h-full px-4 text-white bg-indigo-600 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}
