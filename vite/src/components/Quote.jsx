import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import quote from "./assets/quote.jpg";

const Quote = () => {
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialise AOS avec une durée de 1 seconde
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="flex mt-54" data-aos="fade-up">
      <img
        src={quote}
        className="h-96 w-2/5 ml-24 mb-20 mr-16 rounded-2xl"
        alt=""
      />
      <div className="w-2/3 mr-12 mt-24">
        <h2 className="text-4xl font-bold mb-4 text-amber-500">Quote</h2>
        <p className="ml-4">
          En offrant un foyer aimant à un animal dans le besoin, vous faites
          bien plus que gagner un compagnon fidèle ; vous sauvez une vie. Chaque
          adoption compte, et chaque geste de générosité contribue à faire une
          réelle différence dans le monde des animaux.
        </p>
        {showMore && (
          <p className="ml-4">
            Voici un autre paragraphe de votre choix qui sera affiché lorsque vous cliquez sur "Show more".
          </p>
        )}
        <button
          className="text-amber-500 border border-amber-500 py-2 px-4 rounded mt-4"
          onClick={toggleShowMore}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
};

export default Quote;
