const BreedCard = ({ breed }: { breed: string }) => {
  // on click this will send the breed to the backend,
  // this will return a list of ids
  // that list of ids will be sent to the frontend

  // breed selection
  // sends you to '/[breed]/
  // /[breed/]

  return (
    <div>
      <p className="fill-indigo-950 font-bold">{breed}</p>
    </div>
  );
};

export default BreedCard;

// other option is to just have this stuff on the client and store everything as state -
// query state for API
// state with an array of favorited breeds
