import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosClient } from "../../api/axios";

const OrdersDashboard = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
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

    const GetOrders = async () => {
        try {
            const { data } = await axiosClient.get(
                "http://localhost:8000/api/orders-list"
            );
            setOrders(data.orders);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
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
        GetOrders();
    }, []);

    const AcceptOrder = (orderId) => {
        axiosClient
            .put(`http://localhost:8000/api/accept-order/${orderId}`, {
                status: "Accepté",
            })
            .then((response) => {
                GetOrders();
            })
            .catch((error) => {
                console.error("Error accepting order:", error);
            });
    };
    const RefuseOrder = (orderId) => {
        axiosClient
            .put(`http://localhost:8000/api/refuse-order/${orderId}`, {
                status: "Refusé",
            })
            .then((response) => {
                GetOrders();
            })
            .catch((error) => {
                console.error("Error accepting order:", error);
            });
    };
    const ResetStatus = (orderId) => {
        axiosClient
            .put(`http://localhost:8000/api/reset-order/${orderId}`, {
                status: "pending",
            })
            .then((response) => {
                GetOrders();
            })
            .catch((error) => {
                console.error("Error accepting order:", error);
            });
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
                            Gestion des Ordres D'adoption
                        </h1>
                    </div>
                    <table className="w-full border mt-6">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Nom</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Téléphone</th>
                                <th className="border px-4 py-2">
                                    Nom d'animal
                                </th>
                                <th className="border px-4 py-2">espece</th>
                                <th className="border px-4 py-2">Photo</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="border px-4 py-2">
                                        {order.user.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {order.user.email}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {order.user.telephone}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {order.pet.nom}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {order.pet.espece}
                                    </td>
                                    <td className="border max-w-7 px-4 py-2">
                                        <img
                                            src={`http://localhost:8000/storage/${order.pet.photo}`}
                                            alt=""
                                        />
                                    </td>
                                    <td className="border px-4 py-2">
                                        {/* {console.log(
                                            "Order Status:",
                                            order.status
                                        )} */}

                                        {order.status === "pending" ? (
                                            <>
                                                <button
                                                    className="ml-4 bg-amber-500 hover:bg-orange-500 px-2 py-1 rounded text-white"
                                                    onClick={() =>
                                                        AcceptOrder(order.id)
                                                    }
                                                >
                                                    Accepter
                                                </button>
                                                <button
                                                    className="ml-4 bg-red-600 hover:bg-red-900 px-2 py-1 rounded text-white"
                                                    onClick={() =>
                                                        RefuseOrder(order.id)
                                                    }
                                                >
                                                    Refuser
                                                </button>
                                                <button className="ml-4 bg-emerald-400 hover:bg-green-700 px-2 py-1 rounded text-white">
                                                    <Link
                                                        to={`/admin/details-pet/${order.pet.id}`}
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
                                                    {order.status}
                                                </h3>
                                                <button
                                                    className="ml-4 bg-amber-500 hover:bg-orange-500 px-2 py-1 rounded text-white"
                                                    onClick={() =>
                                                        ResetStatus(order.id)
                                                    }
                                                >
                                                    Initializer
                                                </button>
                                                <button className="ml-4 bg-emerald-400 hover:bg-green-700 px-2 py-1 rounded text-white">
                                                    <Link
                                                        to={`/admin/details-pet/${order.pet.id}`}
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

export default OrdersDashboard;
