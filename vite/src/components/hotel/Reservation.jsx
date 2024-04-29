import { useEffect, useState } from "react";
import { axiosClient } from "../api/axios";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        user_id: id,
        nom: "",
        espece: "",
        date_debut: new Date().toISOString().split("T")[0],
        date_fin: new Date().toISOString().split("T")[0],
        prix: 20,
        duree: 0,
    });

    const [userDetails, setUserDetails] = useState({
        id: null,
        name: "",
        email: "",
        email_verified_at: null,
        admin: null,
        created_at: null,
        updated_at: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const fetchUserDetails = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
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

            setId(response.data.id);
            setFormData((prevFormData) => ({
                ...prevFormData,
                user_id: response.data.id,
            }));
            console.log(formData.id);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    // DATE DIFF
    const handleDateFinChange = (e) => {
        const { value } = e.target;
        const { date_debut } = formData;

        if (value < date_debut) {
            setError("La date fin ne peut pas être avant la date de début.");
            setFormData({
                ...formData,
                date_fin: date_debut, // Set date_fin equal to date_debut
            });
        }
        // else {
        //     setError("error");
        // }

        setFormData({
            ...formData,
            date_fin: value,
        });
    };

    //useEffect fkola mra ldate dial debut wla fin katbdel ghaytbdel m3aha duree wl prix
    useEffect(() => {
        fetchUserDetails();
        console.log(id);
        const start = new Date(formData.date_debut);
        const end = new Date(formData.date_fin);

        const diffInMilliseconds = end - start;

        const newDuree = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

        let newPrix = newDuree * 20;
        if (newPrix < 0) {
            newPrix = 0;
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            duree: newDuree,
            prix: newPrix,
        }));
    }, [formData.date_debut, formData.date_fin]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        axiosClient.post(
            "http://localhost:8000/api/make-reservation",
            formData
        );
        try {
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mt-12">
            <h1 className="text-3xl mt-24 font-extrabold text-center select-none">
                Effectuer Votre Résérvation
            </h1>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <form onSubmit={handleSubmit}>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="fName"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        Nom De Votre Animal
                                    </label>
                                    <input
                                        type="text"
                                        name="nom"
                                        id="nom"
                                        onChange={handleChange}
                                        placeholder="Nom De Votre Animal"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="espece"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        Espece
                                    </label>
                                    <input
                                        type="text"
                                        name="espece"
                                        id="espece"
                                        onChange={handleChange}
                                        placeholder="Espece"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="date_debut"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        Date Début
                                    </label>
                                    <input
                                        type="date"
                                        name="date_debut"
                                        id="date_debut"
                                        onChange={handleChange}
                                        value={formData.date_debut}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        htmlFor="date_fin"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        Date Fin
                                    </label>
                                    <input
                                        type="date"
                                        name="date_fin"
                                        id="date_fin"
                                        value={formData.date_fin}
                                        onChange={handleDateFinChange}
                                        min={formData.date_debut || ""}
                                        className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                                            error ? "border-red-500" : ""
                                        }`}
                                    />
                                    {error && (
                                        <p className="text-red-500 mt-1">
                                            {error}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="prix"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Prix <b className="font-bold text-xl">(DH)</b>
                            </label>
                            <input
                                type="number"
                                name="prix"
                                id="prix"
                                onChange={handleChange}
                                placeholder="20 par jour"
                                min="20"
                                value={formData.prix}
                                className="w-full ml-9 text-4xl font-bold appearance-none rounded-md border-none border-[#e0e0e0] bg-white py-3 px-6 text-black outline-none focus:border-[#6A64F1] focus:shadow-md"
                                readOnly
                            />
                        </div>
                        <div>
                            <button className="bg-gradient-to-r from-sky-800 to-blue-500 hover:from-slate-600 hover:to-sky-800 mt-2 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse select-none">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Reservation;
