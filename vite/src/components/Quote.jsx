import quote from "./assets/quote.jpg";

const Quote = () => {
  return (
    <div className="flex mt-54">
      <img
        src={quote}
        className="h-96 w-2/5 ml-24 mb-20 mr-16 rounded-2xl"
        alt=""
      />
      <div className="w-2/3 mr-12 mt-24">
        <h2 className="text-4xl font-bold mb-4 ">Quote</h2>
        <p className="ml-4">
          En offrant un foyer aimant à un animal dans le besoin, vous faites
          bien plus que gagner un compagnon fidèle ; vous sauvez une vie. Chaque
          adoption compte, et chaque geste de générosité contribue à faire une
          réelle différence dans le monde des animaux.
        </p>
      </div>
    </div>
  );
};

export default Quote;
