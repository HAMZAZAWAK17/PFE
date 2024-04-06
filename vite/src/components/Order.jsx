import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Order = () => {
    const { id } = useParams();
    const [animal, setAnimal] = useState({
        nom: "",
        photo: "",
        description: "",
        sexe: "",
        espece: "",
        age: 0,
        sante: "",
    });
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        nom: "",
        email: "",
        telephone: "",
        message: "",
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/details-pets/${id}`)
            .then((response) => {
                setAnimal(response.data.pet);
            })
            .catch((error) => {
                console.error("Error fetching pet:", error);
            });
    }, [id]);

    const [showForm, setShowForm] = useState(false);

    const handleConfirmAdoption = () => {
        setShowPopup(true);
        setShowForm(true); // Activer l'affichage du formulaire
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Vérifier si tous les champs requis sont remplis
        // if (
        //     !formData.nom ||
        //     !formData.email ||
        //     !formData.telephone ||
        //     !formData.message
        // ) {
        //     // Afficher un SweetAlert d'erreur
        //     Swal.fire({
        //         icon: "error",
        //         title: "Erreur",
        //         text: "Veuillez remplir tous les champs du formulaire.",
        //     });
        //     return; // Arrêter l'exécution de la fonction si des champs sont manquants
        // }
        axios
            .post("http://localhost:8000/make-order", formData)
            .then((response) => {
                console.log(response.data);
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Commande créée avec succès.",
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
        console.log(formData);
        setFormData({
            nom: "",
            email: "",
            telephone: "",
            message: "",
        });
        setShowPopup(false);
    };

    const handleCancel = () => {
        setShowPopup(false); // Fermer la popup
    };

    return (
        <div className="flex h-screen">
            <div className="">
                <Link to="/" className="Btn absolute top-0 left-0">
                    <div className="sign">
                        <svg viewBox="0 0 512 512">
                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                        </svg>
                    </div>
                    <div className="text">Back</div>
                </Link>
            </div>
            <div className="flex ml-0 items-center w-full md:w-5/6 lg:w-full xl:w-1/2 mx-auto">
                {animal ? (
                    <>
                        <div className="w-2/3 p-4">
                            <div className="rounded-xl overflow-hidden">
                                <img
                                    src={`http://localhost:8000/storage/${animal.photo}`}
                                    alt={animal.nom}
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-5/6 lg:w-2/3 xl:w-1/2 mx-auto">
                            <div className="rounded-xl bg-white shadow-lg p-5">
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

                                <p
                                    className="text-slate-800 font-poppins text-lg mt-3"
                                    style={{ whiteSpace: "pre-wrap" }}
                                >
                                    <b>Description:</b> {animal.description}
                                </p>

                                <button
                                    onClick={handleConfirmAdoption}
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
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 mt-10">
                    <div
                        className={`bg-white shadow-lg p-5 form-animation ${
                            showForm ? "form-show" : ""
                        }`}
                    >
                        <h2 className="text-xl font-bold mb-4">
                            Formulaire d'adoption
                        </h2>
                        <form className="w-full max-w-lg">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-first-name"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="grid-first-name"
                                        type="text"
                                        placeholder="Jane"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-last-name"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-last-name"
                                        type="text"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Phone number
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-tel"
                                        type="tel"
                                        placeholder="Your phone number"
                                    />
                                    <p className="text-gray-600 text-xs italic">
                                        Please enter your current phone number
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-city"
                                    >
                                        City
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-city"
                                        type="text"
                                        placeholder="Albuquerque"
                                    />
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-state"
                                    >
                                        State
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-state"
                                        >
                                            <option>Casablanca</option>
                                            <option>Tanger</option>
                                            <option>Rabat</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-zip"
                                    >
                                        Zip
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-zip"
                                        type="text"
                                        placeholder="90210"
                                    />
                                </div>
                            </div>
                        </form>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleSubmit}
                                className="bg-amber-400 rounded-xl py-3 px-6 font-semibold hover:bg-slate-400 focus:scale-75 transition-all duration-250 ease-out"
                            >
                                Adopt it
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-400 rounded-xl py-3 px-6 font-semibold hover:bg-gray-600 focus:scale-75 transition-all duration-250 ease-out"
                            >
                                Cancel
                            </button>
                        </div>

                        <div className="flex flex-col items-center mt-4">
                            <b>or</b>
                            <b>Contactez-nous au:</b>
                            <p>+1234567890</p>
                            <p>+0987654321</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;
