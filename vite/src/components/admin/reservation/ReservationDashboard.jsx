import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Unauthorized from "../../other/Unauthorized";
import { axiosClient } from "../../api/axios";
import toast from "react-hot-toast";

const ReservationDashboard = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [popup, setPopup] = useState(false);
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
    const [raison, setRaison] = useState("");

    const GetReservations = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axiosClient.get("/reservation-list");
            setReservations(data.reservations);
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
                    "http://127.0.0.1:8000/api/user-detail"
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
        GetReservations();
    }, []);

    const AcceptReservation = (reservationId) => {
        axiosClient
            .put(
                `http://localhost:8000/api/accept-reservation/${reservationId}`
            )
            .then((response) => {
                GetReservations();
            })
            .catch((error) => {
                console.error("Error accepting reservation:", error);
            });
    };

    const RefuseReservation = (reservationId) => {
        axiosClient
            .put(
                `http://localhost:8000/api/refuse-reservation/${reservationId}`,
                {
                    raison: raison,
                }
            )
            .then((response) => {
                GetReservations();
            })
            .catch((error) => {
                console.error("Error accepting reservation:", error);
            });
    };

    const ResetStatus = (reservationId) => {
        axiosClient
            .put(`http://localhost:8000/api/reset-reservation/${reservationId}`)
            .then((response) => {
                GetReservations();
            })
            .catch((error) => {
                console.error("Error accepting reservation:", error);
            });
    };

    const handleclosePopUp = (e) => {
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
                            Gestion des Reservations
                        </h1>
                    </div>
                    <table className="w-full border mt-6">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">
                                    Nom d'animal
                                </th>
                                <th className="border px-4 py-2">Espece</th>
                                <th className="border px-4 py-2">Date Début</th>
                                <th className="border px-4 py-2">Date Fin</th>
                                <th className="border px-4 py-2">Duree</th>
                                <th className="border px-4 py-2">Prix</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td className="border px-4 py-2">
                                        {reservation.nom}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {reservation.espece}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {reservation.date_debut}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {reservation.date_fin}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {reservation.duree}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {reservation.prix}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {reservation.status === "pending" ? (
                                            <>
                                                <button
                                                    className="ml-4 bg-amber-500 hover:bg-orange-500 px-2 py-1 rounded text-white"
                                                    onClick={() =>
                                                        AcceptReservation(
                                                            reservation.id
                                                        )
                                                    }
                                                >
                                                    Accepter
                                                </button>
                                                <button
                                                    className="ml-4 bg-red-600 hover:bg-red-900 px-2 py-1 rounded text-white"
                                                    onClick={() =>
                                                        setPopup(true)
                                                    }
                                                >
                                                    Refuser
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
                                                                    Veuillez
                                                                    donner la ou
                                                                    les raisons
                                                                    de refus
                                                                </h2>
                                                                <textarea
                                                                    name="raison"
                                                                    id=""
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setRaison(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    cols="30"
                                                                    rows="10"
                                                                    className="w-full border-2 border-spacing-7"
                                                                ></textarea>
                                                                <div className="flex justify-center">
                                                                    <button
                                                                        className="bg-slate-900 text-white p-2 rounded-md right-0"
                                                                        onClick={() =>
                                                                            RefuseReservation(
                                                                                reservation.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Valider
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                <button className="ml-4 bg-emerald-400 hover:bg-green-700 px-2 py-1 rounded text-white">
                                                    <Link
                                                        to={`/admin/details-pet/${reservation.id}`}
                                                    >
                                                        Détails
                                                    </Link>
                                                </button>
                                            </>
                                        ) : (
                                            <div className="flex">
                                                <h3
                                                    className={`ml-4 px-2 py-1 rounded`}
                                                >
                                                    {reservation.status}
                                                </h3>
                                                <button
                                                    className="ml-4 bg-amber-500 hover:bg-orange-500 px-2 py-1 rounded text-white"
                                                    onClick={() =>
                                                        ResetStatus(
                                                            reservation.id
                                                        )
                                                    }
                                                >
                                                    Initializer
                                                </button>
                                                <button className="ml-4 bg-emerald-400 hover:bg-green-700 px-2 py-1 rounded text-white">
                                                    <Link
                                                        to={`/admin/details-pet/${reservation.id}`}
                                                    >
                                                        Détails
                                                    </Link>
                                                </button>
                                            </div>
                                        )}
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
                <>{!loading && <Unauthorized />}</>
            )}
        </div>
    );
};

export default ReservationDashboard;
