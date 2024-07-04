import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosClient } from "../api/axios";

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState(null);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axiosClient.get("/user/orders");
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
                localStorage.removeItem("token");
                navigate("/");
            }
        };
        fetchOrders();
        console.log(orders);
    }, []);

    const handleClosePopUp = (e) => {
        if (e.target.id === "ModelContainer") {
            setPopup(false);
        }
    };

    return (
        <div className="mt-24 container max-w-full px-4 py-8">
            {orders ? (
                <>
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                            Status de demandes D'adoption
                        </p>
                        {orders.map((order) => (
                            <div
                                className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                                key={order.id}
                            >
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img
                                        className="w-full hidden md:block"
                                        src={`http://localhost:8000/storage/${order.pet.photo}`}
                                        alt="dress"
                                    />
                                </div>
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                            {order.pet.nom}
                                        </h3>
                                        <div className="flex justify-start items-start flex-col space-y-2">
                                            <p className="text-sm leading-none text-gray-800">
                                                <span className="text-slate-900">
                                                    Espece:{" "}
                                                </span>{" "}
                                                {order.pet.espece}
                                            </p>
                                            <p className="text-sm leading-none text-gray-800">
                                                <span className="text-slate-900">
                                                    Age:{" "}
                                                </span>{" "}
                                                {order.pet.age}
                                            </p>
                                            <p className="text-sm leading-none text-gray-800">
                                                <span className="text-slate-900">
                                                    Santé:{" "}
                                                </span>{" "}
                                                {order.pet.sante}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        <p
                                            className={`text-base xl:text-lg leading-6 ${
                                                order.status === "Refusé"
                                                    ? "text-red-500"
                                                    : order.status === "Accepté"
                                                    ? "text-green-500"
                                                    : "text-blue-950"
                                            }`}
                                        >
                                            {order.status}
                                        </p>

                                        {order.status === "Refusé" ? (
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
                                        ) : order.status === "Accepté" ? (
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
                        Aucune demande trouvée
                    </p>
                    <div className="flex justify-center">
                        <button className="bg-slate-900 text-white p-2 rounded-md mt-2">
                            <Link to={"/pets"}>Adoptez un animal</Link>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Orders;
