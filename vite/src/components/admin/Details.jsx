// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const Details = () => {
//   const { petId } = useParams();
//   const [data, setData] = useState({
//     nom: "",
//     photo: "",
//     description: "",
//     sexe: "",
//     espece: "",
//     age: 0,
//     sante: "",
//   });

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/details-pets/${petId}`)
//       .then((response) => {
//         setData(response.data.pet);
//       })
//       .catch((error) => {
//         console.error("Error fetching pet:", error);
//       });
//   }, [petId]);

//   return (
//     <div className="flex">
//       {data.photo && (
//         <div>
//           <img src={`http://localhost:8000/storage/${data.photo}`} alt="" />
//         </div>
//       )}
//       <div>
//         <h2 className="font-bold text-6xl">{data.nom}</h2>
//         <p className="mt-14">{data.description}</p>
//         <p>Sexe: {data.sexe}</p>
//         <p>Espece: {data.espece}</p>
//         <p>Age: {data.age}</p>
//         <p>Santé: {data.sante}</p>
//       </div>
//     </div>
//   );
// };

// export default Details;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Details = () => {
  const { petId } = useParams();
  const [data, setData] = useState({
    nom: "",
    photo: "",
    description: "",
    sexe: "",
    espece: "",
    age: 0,
    sante: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/details-pets/${petId}`)
      .then((response) => {
        setData(response.data.pet);
      })
      .catch((error) => {
        console.error("Error fetching pet:", error);
      });
  }, [petId]);

  return (
    <div className="flex justify-center items-center h-screen mt-10">
      <div className="max-w-lg p-8 bg-gray-100 rounded-lg shadow-md">
        {data.photo && (
          <div>
            <img src={`http://localhost:8000/storage/${data.photo}`} alt="" />{" "}
          </div>
        )}
        <div>
          <h2 className="font-bold text-3xl mt-4">{data.nom}</h2>
          <p className="mt-2">{data.description}</p>
          <p><b>Sexe:</b> {data.sexe}</p>
          <p><b>Espece:</b> {data.espece}</p>
          <p><b>Age:</b> {data.age}</p>
          <p><b>Santé:</b> {data.sante}</p>
        </div>
      </div>
      <Link
        to="/admin-dashboard"
        className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Back
      </Link>
    </div>
  );
};

export default Details;
