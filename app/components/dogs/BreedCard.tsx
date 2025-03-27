const BreedCard = ({
  breed,
  handleBreedClick,
}: {
  breed: string;
  handleBreedClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    breed: string
  ) => void;
}) => {
  return (
    <div>
      <button
        onClick={(e) => handleBreedClick(e, breed)}
        className="flex flex-col items-center"
      >
        <p className="fill-indigo-950 font-bold">{breed}</p>
      </button>
    </div>
  );
};

export default BreedCard;
