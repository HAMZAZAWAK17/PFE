import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosClient } from "../api/axios";

const Reservations = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState(null);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axiosClient.get("/user/reservations");
                setReservations(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
                // localStorage.removeItem("token");
                // navigate("/");
            }
        };
        fetchReservations();
        console.log(reservations);
    }, []);

    const handleClosePopUp = (e) => {
        if (e.target.id === "ModelContainer") {
            setPopup(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="mt-24 container max-w-full px-4 py-8">
            {reservations ? (
                <>
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                            Status de demandes D'adoption
                        </p>
                        {reservations.map((reservation) => (
                            <div
                                className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                                key={reservation.id}
                            >
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                            {reservation.nom}
                                        </h3>
                                        <div className="flex justify-start items-start flex-col space-y-2">
                                            <p className="text-sm leading-none text-gray-800">
                                                <span className="text-slate-900">
                                                    <b>Espece</b>:{" "}
                                                </span>{" "}
                                                {reservation.espece}
                                            </p>
                                            <p className="text-sm leading-none text-gray-800">
                                                <span className="text-slate-900">
                                                    <b>Prix</b>:{" "}
                                                </span>{" "}
                                                {reservation.prix} DH
                                            </p>
                                            <p className="text-sm leading-none text-gray-800">
                                                <span className="text-slate-900">
                                                    <b>Date</b>:{" "}
                                                </span>{" "}
                                                {formatDate(
                                                    reservation.date_debut
                                                )}{" "}
                                                à{" "}
                                                {formatDate(
                                                    reservation.date_fin
                                                )}
                                            </p>
                                            <p className="text-sm leading-none text-gray-800">
                                                <span className="text-slate-900">
                                                    <b>Durée</b>:{" "}
                                                </span>{" "}
                                                {reservation.duree} Jours
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        <p
                                            className={`text-base xl:text-lg leading-6 ${
                                                reservation.status === "Refusé"
                                                    ? "text-red-500"
                                                    : reservation.status ===
                                                      "Accepté"
                                                    ? "text-green-500"
                                                    : "text-blue-950"
                                            }`}
                                        >
                                            {reservation.status}
                                        </p>

                                        {reservation.status === "Refusé" ? (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        setPopup(true)
                                                    }
                                                    className="ml-4 bg-red-600 hover:bg-red-900 px-2 py-1 rounded text-white"
                                                >
                                                    Voir Raison
                                                </button>

                                                {popup && (
                                                    <div
                                                        id="ModelContainer"
                                                        onClick={
                                                            handleClosePopUp
                                                        }
                                                        className="fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm"
                                                    >
                                                        <div className="p-2 bg-white w-10/12 md:w-1/2 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-5">
                                                            <div className="w-full p-3 justify-center items-center">
                                                                <h2 className="font-semibold py-3 text-center text-xl">
                                                                    la ou les
                                                                    raisons de
                                                                    refus
                                                                </h2>
                                                                <textarea
                                                                    name="raison"
                                                                    id=""
                                                                    cols="30"
                                                                    rows="10"
                                                                    className="w-full border-none border-spacing-7"
                                                                    readOnly
                                                                >
                                                                    {
                                                                        order.raison
                                                                    }
                                                                </textarea>
                                                                <div className="flex justify-center">
                                                                    <button
                                                                        className="bg-slate-900 text-white p-2 rounded-md right-0"
                                                                        onClick={() =>
                                                                            setPopup(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        Fermer
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : reservation.status === "Accepté" ? (
                                            <p>
                                                Nous allons vous contacter
                                                bientôt
                                            </p>
                                        ) : (
                                            <p>En attente</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800 text-center">
                        Aucune résérvation trouvée
                    </p>
                    <div className="flex justify-center">
                        <button className="bg-slate-900 text-white p-2 rounded-md mt-2">
                            <Link to={"/hotel"}>Effectuer Une résérvation</Link>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Reservations;
