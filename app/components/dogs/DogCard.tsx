import Image from "next/image";

const DogCard = ({
  dog,
  addToFavorites,
}: {
  dog: Dog;
  addToFavorites: (dogId: string) => void;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg mt-4 ">
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
        <button
          className="absolute top-3 right-3 bg-white text-orange-500 hover:bg-orange-500 hover:text-white rounded-full p-2 shadow-md transition-colors duration-200"
          onClick={() => addToFavorites(dog.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-gray-600">Zip code: {dog.zip_code}</span>
        </div>
      </div>

      {/* Card footer with CTA button */}
    </div>
  );
};

export default DogCard;
