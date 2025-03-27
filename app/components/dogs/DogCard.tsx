import Image from "next/image";

const DogCard = ({ dog }: { dog: Dog }) => {
  return (
    <div>
      <button className="flex flex-col items-center bg-purple-500 text-white font-bold py-2 px-4 rounded-md">
        FAVORITE
      </button>
      <Image src={dog.img} alt={dog.name} width={200} height={200} />
      <p className="text-purple-600 font-bold">{dog.breed}</p>
      <p className="text-purple-600 font-bold">{dog.age}</p>
      <p className="text-purple-600 font-bold">{dog.zip_code}</p>
      <p className="fill-indigo-950 font-bold">{dog.name}</p>
    </div>
  );
};

export default DogCard;
