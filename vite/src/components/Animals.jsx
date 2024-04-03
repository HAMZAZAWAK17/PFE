import React, { useState, useEffect } from "react";
import axios from "axios";

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [displayedAnimals, setDisplayedAnimals] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const initialCount = 6;
  const additionalCount = 15;

  useEffect(() => {
    const fetchAllAnimals = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/petlist");
        setAnimals(response.data.pets); // Assurez-vous que la clé est correcte ici
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchAllAnimals();
  }, []);

  useEffect(() => {
    if (showMore) {
      setDisplayedAnimals(animals.slice(0, initialCount + additionalCount));
    } else {
      setDisplayedAnimals(animals.slice(0, initialCount));
    }
  }, [animals, showMore]);

  const toggleShowMore = () => {
    setShowMore((prevState) => !prevState);
  };

  return (
    <div>
      <div className="justify-center mt-28">
        <div className="text-center mb-2.5 text-3xl font-bold">
          <h3>Adoptable Animals</h3>
        </div>
        <div className="text-center text-sm">
          <p>Browse through our selection of featured animals.</p>
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayedAnimals.map((animal) => (
            <div
              key={animal.id}
              className="rounded-xl bg-white shadow-lg mt-12 ml-4"
            >
              <div className="p-5 flex flex-col">
                <div className="rounded-xl overflow-hidden max-h-64 max-w-80 drop-shadow-md">
                  <img
                    src={`http://localhost:8000/storage/${animal.photo}`}
                    alt={animal.nom}
                    className="object-cover min-h-80 min-w-72"
                  />
                </div>
                <h5 className="text-2xl text-amber-400 font-poppins font-bold md:text-3xl mt-3">
                  {animal.nom}
                </h5>

                <p className="text-slate-800 font-poppins text-lg mt-3">
                  <b>Age:</b>
                  {animal.age}
                </p>

                <p className="text-slate-800 font-poppins text-lg mt-3">
                  <b>Espece:</b>
                  {animal.espece}
                </p>

                <p className="text-slate-800 font-poppins text-lg mt-3">
                  <b>Sexe:</b>
                  {animal.sexe}
                </p>

                <p className="text-slate-800 font-poppins text-lg mt-3">
                  <b>Santé:</b>
                  {animal.sante}
                </p>

                <p className="text-slate-800 font-poppins text-lg mt-3">
                  <b>Description:</b>
                  {animal.description.substring(0, 150)}...
                </p>
                <a
                  href={`/admin/details-pet/${animal.id}`}
                  className="text-center bg-amber-400 rounded-xl py-3 px-2 mt-4 
                  font-semibold hover:bg-slate-400 focus:scale-75 
                  transition-all duration-250 ease-out"
                >
                  Voir Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-8">
        <button
          onClick={toggleShowMore}
          className="bg-amber-400 hover:bg-amber-500 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default Animals;
