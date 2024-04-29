import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { axiosClient } from "../../api/axios";

const UsersDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
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

    const GetUsers = async () => {
        try {
            const { data } = await axiosClient.get(
                "http://localhost:8000/api/users-list"
            );
            setUsers(data.users);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const countUsers = () => {
        return users.length;
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
                    "http://127.0.0.1:8000/api/user-details",
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
                    toast.error("Session expiré .Veuillez se reconnecter");
                    navigate("/");
                    localStorage.removeItem("token");
                } else {
                    console.error("Error fetching user details:", error);
                }
            }
        };

        fetchUserDetails();
        GetUsers();
    }, []);

    const deleteUser = (id) => {
        axiosClient
            .delete(`http://localhost:8000/api/delete-user/${id}`)
            .then((response) => {
                setUsers(users.filter((user) => user.id !== id));
                GetUsers();
            })
            .catch((error) => {
                console.error("Error deleting pet:", error);
            });
        toast.success("L'utilisateur a été supprimé avec succès.");
    };

    const inputRef = useRef();

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

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
                            Gestion des Utilisateurs
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
                    <div className="bg-blue-500 text-white p-4 mr-9 rounded-md mb-4">
                        <h2>Nombre d'utilisateurs:</h2>
                        <p>{countUsers()}</p>
                    </div>
                    <table className="w-full border mt-6">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Nom</th>
                                <th className="border px-4 py-2">email</th>
                                <th className="border px-4 py-2">adresse</th>
                                <th className="border px-4 py-2">telephone</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users
                                .filter((user) => {
                                    return search.toLowerCase() === user
                                        ? user
                                        : user.name
                                              .toLowerCase()
                                              .includes(search) ||
                                              user.email
                                                  .toLowerCase()
                                                  .includes(search) ||
                                              user.adresse
                                                  .toLowerCase()
                                                  .includes(search) ||
                                              user.telephone
                                                  .toLowerCase()
                                                  .includes(search);
                                })
                                .map((user) => (
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
                                                onClick={() =>
                                                    deleteUser(user.id)
                                                }
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

export default UsersDashboard;
