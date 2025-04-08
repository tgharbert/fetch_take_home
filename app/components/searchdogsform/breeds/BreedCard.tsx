import { X } from "lucide-react";

const BreedCard = ({
  breed,
  removeBreed,
}: {
  breed: string;
  removeBreed: (e: React.MouseEvent<HTMLButtonElement>, breed: string) => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-between bg-purple-400 text-white p-1.5 m-1 rounded-lg">
      <p className="fill-indigo-950 font-bold">{breed}</p>
      <button
        onClick={(e) => removeBreed(e, breed)}
        className="flex flex-col items-center ml-2"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default BreedCard;
