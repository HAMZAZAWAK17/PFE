//StaffDashboard.jsx

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const GetStaff = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/staff-list");
      setStaff(data.staff);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetStaff();
  }, []);

  const deleteStaff = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Cette action est irréversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/delete-staff/${id}`)
          .then((response) => {
            setStaff(staff.filter((staff) => staff.id !== id));
            GetStaff();
          })
          .catch((error) => {
            console.error("Error deleting staff:", error);
          });
        Swal.fire(
          "Supprimé!",
          "Le membre du personnel a été supprimé avec succès.",
          "success"
        );
      }
    });
  };

  const inputRef = useRef();

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="container max-w-full px-4 py-8">
      <div className="flex">
        <h1 className="text-2xl font-bold mb-4">Gestion du Personnel</h1>
        <span className="flex justify-between items-center ml-96 space-x-3">
          <FaSearch
            size={15}
            opacity={0.7}
            onClick={focusInput}
            className="mt-xl"
          />
          <input
            type="text"
            name="search"
            ref={inputRef}
            onChange={(e) => setSearch(e.target.value)}
            className="focus:border-none border outline-none"
            placeholder="Rechercher un membre du personnel"
            id=""
          />
        </span>
      </div>
      <button>
            <Link
              to="/admin/add-staff"
              className="bg-slate-800 text-amber-300 py-2 px-3 rounded-md mb-4"
            >
              Ajouter un employe
            </Link>
          </button>
      <table className="w-full border mt-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nom</th>
            <th className="border px-4 py-2">Rôle</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {staff
            .filter((staff) => {
              return search.toLowerCase() === staff
                ? staff
                : staff.nom.toLowerCase().includes(search) ||
                    staff.role.toLowerCase().includes(search) ||
                    staff.email.toLowerCase().includes(search);
            })
            .map((staff) => (
              <tr key={staff.id}>
                <td className="border px-4 py-2">{staff.nom}</td>
                <td className="border px-4 py-2">{staff.role}</td>
                <td className="border px-4 py-2">{staff.email}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white ml-7 px-2 py-1 rounded"
                    onClick={() => deleteStaff(staff.id)}
                  >
                    Supprimer
                  </button>
                  <button className="ml-4 bg-amber-500 hover:bg-orange-500 px-2 py-1 rounded text-white">
                    <Link to={`/admin/edit-staff/${staff.id}`}>Modifier</Link>
                  </button>
                  <button className="ml-4 bg-emerald-400 hover:bg-orange-500 px-2 py-1 rounded text-white">
                    <Link to={`/admin/details-staff/${staff.id}`}>Détails</Link>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isLoading && (
        <div className="flex flex-col justify-center items-center mt-6">
          <i className="fa fa-cog fa-spin fa-3x fa-fw mb-2"></i>
          <h3>Chargement...</h3>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
