import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import { useState } from "react";

const DogCard = ({
  dog,
  addToFavorites,
}: {
  dog: Dog;
  addToFavorites: (dogId: string) => void;
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (dog: Dog) => {
    addToFavorites(dog.id);
    setIsFavorite((prev: boolean) => !prev);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg mt-4 w-80">
      {/* Image container with fixed aspect ratio */}
      <div className="relative h-64 w-full">
        <Image
          src={dog.img}
          alt={dog.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Favorite button positioned in top-right corner */}
        {isFavorite ? (
          <button
            className="absolute top-3 right-3 bg-red-500 text-w-500 hover:bg-red-300 hover:text-white rounded-full p-2 shadow-md transition-colors duration-200"
            onClick={() => toggleFavorite(dog)}
          >
            <Heart className="h-5 w-5 text-white" />
          </button>
        ) : (
          <button
            className="absolute top-3 right-3 bg-white  hover:bg-red-300 hover:text-white rounded-full p-2 shadow-md transition-colors duration-200"
            onClick={() => toggleFavorite(dog)}
          >
            <Heart className="h-5 w-5 text-gray-300" />
          </button>
        )}
      </div>

      {/* Content section */}
      <div className="p-4">
        {/* Dog name heading */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">{dog.name}</h2>

        {/* Dog info grid */}
        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
          <div>
            <span className="text-gray-500">Breed:</span>
            <p className="font-medium text-gray-800">{dog.breed}</p>
          </div>
          <div>
            <span className="text-gray-500">Age:</span>
            <p className="font-medium text-gray-800">{dog.age} years</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center mt-3 text-sm">
          <MapPin className="h-4 w-4 text-orange-500 mr-1" />
          <span className="text-gray-600">Zip code: {dog.zip_code}</span>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
