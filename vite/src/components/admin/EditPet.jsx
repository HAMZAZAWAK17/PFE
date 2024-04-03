import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditPet = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    nom: "",
    photo: "",
    description: "",
    sexe: "",
    espece: "",
    age: 0,
    sante: "",
  });
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({
    id: null,
    name: "",
    email: "",
    email_verified_at: null,
    admin: null,
    created_at: null,
    updated_at: null,
  });
  const [admin, setAdmin] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/api/user-detail",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserDetails(response.data);
        setAdmin(response.data.admin);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Authentication Failed",
            text: "Please log in again.",
          }).then(() => {
            navigate("/");
          });
        } else {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
    axios
      .get(`http://localhost:8000/api/edit-pet/${petId}`)
      .then((response) => {
        setData(response.data.pet);
        // console.log(response.data.pet);
      })
      .catch((error) => {
        console.error("Error fetching pet:", error);
      });
  }, [petId]);

  const handleChangeFile = (e) => {
    setData({ ...data, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (data.photo instanceof File) {
      formData.set("photo", data.photo);
    }
    //formData.append("photo", Object.fromEntries(formData.entries()).photo);
    try {
      await axios.put(
        `http://localhost:8000/api/update-pet/${petId}`,
        Object.fromEntries(formData.entries())
      );
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  return (
    <div className="mt-24">
      {loading && (
        <div className="flex flex-col justify-center items-center mt-6">
          <i className="fa fa-cog fa-spin fa-3x fa-fw mb-2"></i>
          <h3>Chargement...</h3>
        </div>
      )}

      {userDetails && admin === 1 ? (
        <>
          <div className="ml-20">
            <h1 className="text-2xl font-bold mb-4">Modifier Infos</h1>
            <button>
              <Link
                to="/admin-dashboard"
                className="bg-orange-400 text-white py-2 px-3 rounded-md mb-4"
              >
                Annuler
              </Link>
            </button>
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="ml-32 mt-6 max-w-96"
          >
            <div className="mb-4">
              <label htmlFor="nom" className="block text-gray-700 font-bold">
                Nom:
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                defaultValue={data.nom}
                // onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="photo" className="block text-gray-700 font-bold">
                Photo:
              </label>
              <input
                type="file"
                accept="image/*"
                id="photo"
                name="photo"
                // defaultValue={data.photo}
                onChange={handleChangeFile}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold"
              >
                Description:
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                defaultValue={data.description}
                // onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="sexe" className="block text-gray-700 font-bold">
                Sexe:
              </label>
              <select
                id="sexe"
                name="sexe"
                defaultValue={data.sexe}
                // onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              >
                <option value="">
                  -------------- Choisissez le sexe--------------
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="espece" className="block text-gray-700 font-bold">
                Espece:
              </label>
              <input
                type="text"
                id="espece"
                name="espece"
                defaultValue={data.espece}
                // onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-700 font-bold">
                Age :
              </label>
              <input
                type="text"
                id="age"
                name="age"
                defaultValue={data.age}
                // onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="sante" className="block text-gray-700 font-bold">
                Santé:
              </label>
              <input
                type="text"
                id="sante"
                name="sante"
                defaultValue={data.sante}
                // onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className=" bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded"
              >
                Add Pet
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          {!loading && (
            <>
              <h1>You don't have access</h1>
              <button>
                <Link to={"/"}>return</Link>
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EditPet;
