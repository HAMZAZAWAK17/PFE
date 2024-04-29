import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import toast from "react-hot-toast";

const AddMember = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
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
    }, []);

    const handleChangeFile = (e) => {
        setData({ ...data, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await axiosClient.post(
                "http://localhost:8000/api/add-member",
                formData
            );
            toast.success("Votre Membre a été ajouté avec succès.");
            navigate("/admin/team-dashboard");
        } catch (error) {
            console.error("Error adding pet:", error);
            toast.error(
                "Une erreur s'est produite lors de l'ajout de l'animal."
            );
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

            {userDetails && admin === 1 ? (
                <>
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        Ajouter les informations de votre Membre
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="nom"
                                className="block font-bold text-gray-700"
                            >
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
                            <label
                                htmlFor="photo"
                                className="block font-bold text-gray-700"
                            >
                                Photo:
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="image"
                                name="image"
                                onChange={handleChangeFile}
                                className="w-full border rounded px-3 py-2 mt-1"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block font-bold text-gray-700"
                            >
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="w-full border rounded px-3 py-2 mt-1"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label
                                htmlFor="espece"
                                className="block font-bold text-gray-700"
                            >
                                Titre:
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="w-full border rounded px-3 py-2 mt-1"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="espece"
                                className="block font-bold text-gray-700"
                            >
                                Téléphone:
                            </label>
                            <input
                                type="number"
                                id="telephone"
                                name="telephone"
                                className="w-full border rounded px-3 py-2 mt-1"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button
                                type="submit"
                                className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded"
                            >
                                Ajouter Membre
                            </button>
                            <div className="text-center">
                                <Link
                                    to="/admin/team-dashboard"
                                    className="bg-red-600 text-white py-2 px-3 rounded-md inline-block"
                                >
                                    Annuler
                                </Link>
                            </div>
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

export default AddMember;
