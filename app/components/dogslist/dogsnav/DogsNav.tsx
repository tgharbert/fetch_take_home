import { ArrowLeft, ArrowRight } from "lucide-react";

export default function DogsNav({
  numOfDogs,
  handlePrevPage,
  handleNextPage,
  page,
}: {
  numOfDogs: number;
  handleNextPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handlePrevPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  page: number;
}) {
  return (
    <div className="flex justify-center mt-2 mb-4 ">
      {page > 1 ? (
        <button
          onClick={(e) => handlePrevPage(e)}
          className="mt-6 ml-20 flex flex-row items-center justify-center bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200 font-medium hover:-translate-y-0.5"
        >
          Prev
          <ArrowLeft className="h-4 w-4 text-gray-100 ml-1" />
        </button>
      ) : null}
      {numOfDogs === 25 ? (
        <button
          onClick={(e) => handleNextPage(e)}
          className="mt-6 ml-20 flex flex-row items-center justify-center bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200 font-medium hover:-translate-y-0.5"
        >
          Next
          <ArrowRight className="h-4 w-4 text-gray-100 ml-1" />
        </button>
      ) : null}
    </div>
  );
}
