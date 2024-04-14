import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Order = () => {
    const { id: petId } = useParams();
    const navigate = useNavigate();

    const [animal, setAnimal] = useState({
        nom: "",
        photo: "",
        description: "",
        sexe: "",
        espece: "",
        age: 0,
        sante: "",
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
    const [userId, setUserId] = useState(0);

    const fetchUserDetails = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                // return;
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
            setUserId(response.data.id);
            console.log(userDetails.id);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else {
                console.error("Error fetching user details:", error);
            }
        }
    };

    useEffect(() => {
        fetchUserDetails();
        axios
            .get(`http://localhost:8000/api/details-pets/${petId}`)
            .then((response) => {
                setAnimal(response.data.pet);
            })
            .catch((error) => {
                console.error("Error fetching pet:", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { pet_id: petId, user_id: userId };
        axios
            .post("http://localhost:8000/api/make-order", data)
            .then((response) => {
                console.log(response.data);
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Commande créée avec succès.",
                }).then(() => {
                    navigate("/confirmation"); // Rediriger l'utilisateur vers la page de confirmation
                });
            })
            .catch((error) => {
                console.error("Error creating order:", error);
                Swal.fire({
                    icon: "error",
                    title: "Erreur",
                    text: "Une erreur s'est produite lors de la création de la commande.",
                });
            });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            {userDetails.lenght !== 0 ? (
                <div className="w-full md:w-5/6 lg:w-full xl:w-1/2">
                    <div className="w-full mt-200 md:w-5/6 lg:w-2/3 xl:w-1/2 mx-auto">
                        <Link to="/" className="Btn absolute top-0 left-0">
                            <div className="sign">
                                <svg viewBox="0 0 512 512">
                                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                                </svg>
                            </div>
                            <div className="text">Back</div>
                        </Link>
                    </div>
                    <div className="flex ml-0 items-center">
                        {animal ? (
                            <>
                                <div className="w-2/3 p-4 mt-48">
                                    <div
                                        className="rounded-xl overflow-hidden  "
                                        style={{
                                            width: "500px",
                                            height: "400px",
                                        }}
                                    >
                                        <img
                                            src={`http://localhost:8000/storage/${animal.photo}`}
                                            alt={animal.nom}
                                        />
                                    </div>
                                </div>
                                <div className="w-full mt-90 md:w-5/6 lg:w-2/3 xl:w-1/2 mx-auto min-h-100">
                                    <div
                                        className="rounded-xl bg-white shadow-lg p-5 pr-20 ocard ml-36   mt-96 "
                                        style={{
                                            width: "600px",
                                            height: "600px",
                                        }}
                                    >
                                        <h5 className="text-2xl text-amber-400 font-poppins font-bold md:text-3xl">
                                            {animal.nom}
                                        </h5>
                                        <p className="text-slate-800 font-poppins text-lg mt-3">
                                            <b>Age:</b> {animal.age}
                                        </p>
                                        <p className="text-slate-800 font-poppins text-lg mt-3">
                                            <b>Espece:</b> {animal.espece}
                                        </p>
                                        <p className="text-slate-800 font-poppins text-lg mt-3">
                                            <b>Sexe:</b> {animal.sexe}
                                        </p>
                                        <p className="text-slate-800 font-poppins text-lg mt-3">
                                            <b>Santé:</b> {animal.sante}
                                        </p>
                                        <p className="text-slate-800 font-poppins text-lg mt-3 description-wrap">
                                            <b>Description:</b>{" "}
                                            {animal.description}
                                        </p>
                                        <button
                                            onClick={handleSubmit}
                                            className="bg-amber-400 rounded-xl py-3 px-6 mt-4 font-semibold hover:bg-slate-400 focus:scale-75 transition-all duration-250 ease-out"
                                        >
                                            Confirmer l'adoption
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Order;
