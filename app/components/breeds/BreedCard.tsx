const BreedCard = ({
  breed,
  removeBreed,
}: {
  breed: string;
  removeBreed: (e: React.MouseEvent<HTMLButtonElement>, breed: string) => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-between bg-purple-400 text-white p-2 m-2 rounded-lg">
      <p className="fill-indigo-950 font-bold">{breed}</p>
      <button
        onClick={(e) => removeBreed(e, breed)}
        className="flex flex-col items-center ml-2"
      >
        X
      </button>
    </div>
  );
};

export default BreedCard;
