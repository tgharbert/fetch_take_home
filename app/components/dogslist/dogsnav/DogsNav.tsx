export default function DogsNav({
  numOfDogs,
  handlePrevPage,
  handleNextPage,
}: {
  numOfDogs: number;
  handleNextPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handlePrevPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div>
      <button onClick={(e) => handlePrevPage(e)} className="mt-6">
        Prev
      </button>
      {numOfDogs === 25 ? (
        // FIX -- ABSTRACT INTO SEPARATE COMPONENT LATER
        <button onClick={(e) => handleNextPage(e)} className="mt-6">
          Next
        </button>
      ) : null}
    </div>
  );
}
