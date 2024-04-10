import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

const TeamDashboard = () => {
    const navigate = useNavigate();
    const [team, setTeam] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
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

    const GetTeam = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:8000/api/team-list"
            );
            setTeam(data.team);
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
        GetTeam();
    }, []);

    const deleteUser = (id) => {
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
                    .delete(`http://localhost:8000/api/delete-member/${id}`)
                    .then((response) => {
                        setTeam(team.filter((member) => member.id !== id));
                        GetTeam();
                    })
                    .catch((error) => {
                        console.error("Error deleting pet:", error);
                    });
                Swal.fire(
                    "Supprimé!",
                    "Votre animal a été supprimé avec succès.",
                    "success"
                );
            }
        });
    };

    const inputRef = useRef();

    return (
        <div className="container mt-24 ml-10 max-w-full px-4 py-8">
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
                            Gestion des Membres
                        </h1>
                    </div>
                    <button>
                        <Link
                            to="/admin/add-member"
                            className="bg-slate-800 text-amber-300 py-2 px-3 rounded-md mb-4"
                        >
                            Ajouter un Membre
                        </Link>
                    </button>
                    <table className="w-full border mt-6">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Image</th>
                                <th className="border px-4 py-2">Nom</th>
                                <th className="border px-4 py-2">Fonction</th>
                                <th className="border px-4 py-2">
                                    Description
                                </th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {team.map((user) => (
                                <tr key={user.id}>
                                    <td className="border px-4 py-2">
                                        {user.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {user.email}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {user.adresse}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {user.telephone}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white ml-7 px-2 py-1 rounded"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Supprimer
                                        </button>
                                        <button className="ml-4 bg-emerald-400 hover:bg-orange-500 px-2 py-1 rounded text-white">
                                            <Link
                                                to={`/admin/details-pet/${user.id}`}
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

export default TeamDashboard;
