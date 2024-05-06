import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const AddPet = () => {
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
    }, []);

    const handleChangeFile = (e) => {
        setData({ ...data, photo: e.target.files[0] });
    };

    const Submit = async (formData) => {
        const formDataObject = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataObject.append(key, value);
        });
        if (data.photo) {
            formDataObject.append("photo", data.photo); // add the file to the form data
        }

        try {
            const response = await axiosClient.post(
                "http://localhost:8000/api/store-pet",
                formDataObject
            );
            toast.success("L'animal a été ajouté avec succès.");
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Error adding pet:", error);
            toast.error(
                "Une erreur s'est produite lors de l'ajout de l'animal."
            );
        }
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        trigger,
    } = useForm({
        defaultValues: {
            nom: "",
            description: "",
            sexe: "",
            espece: "",
            age: "",
            sante: "",
        },
    });

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
                        Ajouter les informations de votre animal
                    </h1>
                    <form onSubmit={handleSubmit(Submit)} className="space-y-4">
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
                                // onChange={handleChange}
                                className="w-full border rounded px-3 py-2 mt-1"
                                {...register("nom", {
                                    required: "Ce champ est requis",
                                    minLength: {
                                        value: 2,
                                        message:
                                            "Le prénom doit etre au moins 2 characteres",
                                    },
                                    pattern: {
                                        value: /^[a-zA-ZÀ-ÿ\s'-]+$/,
                                        message:
                                            "Ce champ doit être alphabétique",
                                    },
                                })}
                                onBlur={() => trigger("nom")}
                            />
                            {errors.nom && (
                                <span className="text-red-500 text-sm">
                                    {errors.nom.message}
                                </span>
                            )}
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
                                id="photo"
                                name="photo"
                                onChange={handleChangeFile}
                                className="w-full border rounded px-3 py-2 mt-1"
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
                                // onChange={handleChange}
                                className="w-full border rounded px-3 py-2 mt-1"
                                {...register("description", {
                                    required: "Ce champ est requis",
                                    minLength: {
                                        value: 100,
                                        message:
                                            "La description doit etre au moins 100 characteres",
                                    },
                                    pattern: {
                                        value: /^[a-zA-ZÀ-ÿ\s'-]+$/,
                                        message:
                                            "Ce champ doit être alphabétique",
                                    },
                                })}
                                onBlur={() => trigger("description")}
                            ></textarea>
                            {errors.description && (
                                <span className="text-red-500 text-sm">
                                    {errors.description.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="sexe"
                                className="block font-bold text-gray-700"
                            >
                                Sexe:
                            </label>
                            <select
                                id="sexe"
                                name="sexe"
                                // onChange={handleChange}
                                className="w-full border rounded px-3 py-2 mt-1"
                                {...register("sexe", {
                                    required: "Ce champ est requis",
                                })}
                            >
                                <option value="">
                                    -------------- Choisissez le sexe
                                    --------------
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.sexe && (
                                <span className="text-red-500 text-sm">
                                    {errors.sexe.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="espece"
                                className="block font-bold text-gray-700"
                            >
                                Espèce:
                            </label>
                            <input
                                type="text"
                                id="espece"
                                name="espece"
                                // onChange={handleChange}
                                className="w-full border rounded px-3 py-2 mt-1"
                                {...register("espece", {
                                    required: "Ce champ est requis",
                                    pattern: {
                                        value: /^[a-zA-ZÀ-ÿ\s'-]+$/,
                                        message:
                                            "Ce champ doit être alphabétique",
                                    },
                                })}
                                onBlur={() => trigger("espece")}
                            />
                            {errors.espece && (
                                <span className="text-red-500 text-sm">
                                    {errors.espece.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="age"
                                className="block font-bold text-gray-700"
                            >
                                Age:
                            </label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                // onChange={handleChange}
                                className="w-full border rounded px-3 py-2 mt-1"
                                {...register("age", {
                                    required: "Ce champ est requis",
                                    pattern: {
                                        value: /^\d+$/,
                                        message:
                                            "Veuillez entrer un nombre valide pour l'âge",
                                    },
                                })}
                                onBlur={() => trigger("age")}
                            />
                            {errors.age && (
                                <span className="text-red-500 text-sm">
                                    {errors.age.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="sante"
                                className="block font-bold text-gray-700"
                            >
                                Santé:
                            </label>
                            <select
                                type="text"
                                id="sante"
                                name="sante"
                                // onChange={handleChange}
                                className="w-full border rounded px-3 py-2 mt-1"
                                {...register("sante", {
                                    required: "Ce champ est requis",
                                    pattern: {
                                        value: /^[a-zA-ZÀ-ÿ\s'-]+$/,
                                        message:
                                            "Ce champ doit être alphabétique",
                                    },
                                })}
                                onBlur={() => trigger("sante")}
                            >
                                <option value="">
                                    -------------- Choisissez la condition
                                    --------------
                                </option>
                                <option value="bien">Bien</option>
                                <option value="normal">Normal</option>
                                <option value="mal">Mal</option>
                            </select>
                            {errors.sante && (
                                <span className="text-red-500 text-sm">
                                    {errors.sante.message}
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button
                                type="submit"
                                className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded"
                            >
                                Add Pet
                            </button>
                            <div className="text-center">
                                <Link
                                    to="/admin-dashboard"
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

export default AddPet;
