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

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosClient } from "../../api/axios";

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
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    axiosClient
      .get(`http://localhost:8000/api/details-pets/${petId}`)
      .then((response) => {
        setData(response.data.pet);
      })
      .catch((error) => {
        console.error("Error fetching pet:", error);
      });
  }, [petId]);

  const toggleImage = () => {
    setShowImage(!showImage);
  };

  return (
    <div className="flex justify-center items-center h-screen mt-10">
      <div className="max-w-lg p-8 bg-gray-100 rounded-lg shadow-md">
        {data.photo && (
          <div className="rounded-full overflow-hidden w-32 h-32 mx-auto" onClick={toggleImage}>
            <img
              src={`http://localhost:8000/storage/${data.photo}`}
              alt=""
              className="object-cover w-full h-full cursor-pointer"
            />
          </div>
        )}
        {showImage && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <img
              src={`http://localhost:8000/storage/${data.photo}`}
              alt=""
              className="max-w-full max-h-full"
              onClick={toggleImage}
            />
          </div>
        )}
        <div>
        <h2 className="font-bold text-3xl mt-4 text-center" style={{ color: '#ffd401' }}>{data.nom}</h2>

          
          <p><b>Sexe:</b> {data.sexe}</p>
          <p><b>Espece:</b> {data.espece}</p>
          <p><b>Age:</b> {data.age}</p>
          <p><b>Santé:</b> {data.sante}</p>
          <p className="mt-2 description-wrap"><b>Description:</b>{data.description}</p>
        </div>
      </div>
      <Link
        to="/admin-dashboard"
        className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 mt-20 text-white py-2 px-4 rounded"
      >
        Back
      </Link>
    </div>
  );
};

export default Details;

