import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { axiosClient } from "../../api/axios";
import toast from "react-hot-toast";
import Unauthorized from "../../other/Unauthorized";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [popup, setPopup] = useState(false);
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
    const [selectedImage, setSelectedImage] = useState(null); // Nouvel état pour l'image agrandie

    const GetPets = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axiosClient.get("/petlist");
            setPets(data.pets);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axiosClient.get(
                    "http://127.0.0.1:8000/api/user-details"
                );
                setUserDetails(response.data);
                setAdmin(response.data.admin);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (error.response && error.response.status === 401) {
                    toast.error("Session expiré .Veuillez se reconnecter");
                    navigate("/");
                    localStorage.removeItem("token");
                } else {
                    console.error("Error fetching user details:", error);
                }
            }
        };

        fetchUserDetails();
        GetPets();
    }, []);

    const deletePet = (id) => {
        axiosClient
            .delete(`http://localhost:8000/api/delete-pet/${id}`)
            .then((response) => {
                setPets(pets.filter((pet) => pet.id !== id));
                GetPets();
                toast.error("Votre animal a été supprimé avec succès.");
                setPopup(false)
            })
            .catch((error) => {
                console.error("Error deleting pet:", error);
            });
    };

    const inputRef = useRef();

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Fonction pour gérer le clic sur l'image et afficher l'image agrandie
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    // Fonction pour fermer l'image agrandie
    const closeImage = () => {
        setSelectedImage(null);
    };

    const handleClosePopUp = (e) => {
        if (e.target.id === "ModelContainer") {
            setPopup(false);
        }
    };

    return (
        <div className="container max-w-full px-4 py-8">
            {loading && (
                <div className="flex flex-col justify-center items-center mt-6">
                    <i className="fa fa-cog fa-spin fa-3x fa-fw mb-2"></i>
                    <h3>Chargement...</h3>
                </div>
            )}
            {userDetails && admin === 1 ? (
                <>
                    <div className="flex">
                        <h1 className="text-2xl font-bold mb-4">
                            Gestion des animaux
                        </h1>
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
                                placeholder="rechercher votre animal"
                                id=""
                            />
                        </span>
                    </div>
                    <button>
                        <Link
                            to="/admin/add-pet"
                            className="bg-slate-800 text-amber-300 py-2 px-3 rounded-md mb-4"
                        >
                            Ajouter un animal
                        </Link>
                    </button>
                    <table className="w-full border mt-6">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Nom</th>
                                <th className="border px-4 py-2">Photo</th>
                                <th className="border px-4 py-2">
                                    Description
                                </th>
                                <th className="border px-4 py-2">Sexe</th>
                                <th className="border px-4 py-2">Espèce</th>
                                <th className="border px-4 py-2">Age</th>
                                <th className="border px-4 py-2">Santé</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pets
                                .filter((pet) => {
                                    return search.toLowerCase() === pet
                                        ? pet
                                        : pet.nom
                                              .toLowerCase()
                                              .includes(search) ||
                                              pet.espece
                                                  .toLowerCase()
                                                  .includes(search);
                                })
                                .map((pet) => (
                                    <tr key={pet.id}>
                                        <td className="border px-4 py-2">
                                            {pet.nom}
                                        </td>
                                        <td
                                            className="border max-w-7 px-4 py-2"
                                            onClick={() =>
                                                handleImageClick(
                                                    `http://localhost:8000/storage/${pet.photo}`
                                                )
                                            }
                                        >
                                            <img
                                                src={`http://localhost:8000/storage/${pet.photo}`}
                                                alt=""
                                            />
                                        </td>
                                        <td className="border px-4 py-2">
                                            {pet.description.substring(0, 40)}
                                            ...
                                        </td>
                                        <td className="border px-4 py-2">
                                            {pet.sexe}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {pet.espece}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {pet.age}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {pet.sante}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white ml-7 px-2 py-1 rounded"
                                                onClick={() => setPopup(true)}
                                            >
                                                Supprimer
                                            </button>
                                            {popup && (
                                                <div
                                                    id="ModelContainer"
                                                    onClick={handleClosePopUp}
                                                    className="fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm"
                                                >
                                                    <div className="p-2 bg-white w-10/12 md:w-1/2 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-5">
                                                        <div className="w-full p-3 justify-center items-center">
                                                            <h2 className="font-semibold py-3 text-center text-xl">
                                                                Voulez vous
                                                                vraiment
                                                                supprimer cet
                                                                élément
                                                            </h2>
                                                            <p className="w-full text-center py-5">Cet action est défintive</p>
                                                            <div className="flex justify-center">
                                                                <button
                                                                    className="bg-red-700 mr-10 text-white p-2 rounded-md right-0"
                                                                    onClick={() =>
                                                                        deletePet(
                                                                            pet.id
                                                                        )
                                                                    }
                                                                >
                                                                    Supprimer
                                                                </button>
                                                                <button
                                                                    className="bg-slate-900 text-white p-2 rounded-md right-0"
                                                                    onClick={() =>
                                                                        setPopup(
                                                                            false
                                                                        )
                                                                    }
                                                                >
                                                                    Annuler
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <button className="ml-4 bg-amber-500 hover:bg-orange-500 px-2 py-1 rounded text-white">
                                                <Link
                                                    to={`/admin/edit-pet/${pet.id}`}
                                                >
                                                    Modifier
                                                </Link>
                                            </button>
                                            <button className="ml-4 bg-emerald-400 hover:bg-orange-500 px-2 py-1 rounded text-white">
                                                <Link
                                                    to={`/admin/details-pet/${pet.id}`}
                                                >
                                                    Détails
                                                </Link>
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
                    {/* Affichage de l'image agrandie */}
                    {selectedImage && (
                        <div
                            className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-75"
                            onClick={closeImage}
                        >
                            <img
                                src={selectedImage}
                                alt="Enlarged"
                                className="max-w-full max-h-full"
                            />
                        </div>
                    )}
                </>
            ) : (
                <>{!loading && <Unauthorized />}</>
            )}
        </div>
    );
};

export default AdminDashboard;
