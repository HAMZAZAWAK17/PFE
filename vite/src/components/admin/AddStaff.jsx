//AddStaff.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddStaff = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/store-staff",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Succès!",
        text: "Le membre du personnel a été ajouté avec succès.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/admin/staff-dashboard");
      });
    } catch (error) {
      console.error("Error adding staff:", error);
      Swal.fire({
        title: "Erreur!",
        text: "Une erreur s'est produite lors de l'ajout du membre du personnel.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="my-20 mx-auto max-w-lg">
      {loading && (
        <div className="flex flex-col justify-center items-center mt-6">
          <i className="fa fa-cog fa-spin fa-3x fa-fw mb-2"></i>
          <h3>Chargement...</h3>
        </div>
      )}
      {!loading && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Ajouter les informations du membre du personnel
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nom" className="block font-bold text-gray-700">
                Nom:
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block font-bold text-gray-700">
                Rôle:
              </label>
              <input
                type="text"
                id="role"
                name="role"
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-bold text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded"
              >
                Ajouter un membre du personnel
              </button>
              <div className="text-center">
                <Link
                  to="/admin/StaffDashboard"
                  className="bg-red-600 text-white py-2 px-3 rounded-md inline-block"
                >
                  Annuler
                </Link>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AddStaff;
