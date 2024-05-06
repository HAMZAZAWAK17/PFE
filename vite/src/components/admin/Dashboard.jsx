import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosClient } from "../api/axios";
import { FcDepartment } from "react-icons/fc";
import { FcElectricalThreshold } from "react-icons/fc";
import { MdOutlinePets } from "react-icons/md";
import { GiTeamIdea } from "react-icons/gi";
import UserChart from "./charts/UserChart";
import OrderStatusChart from "./charts/OrderStatusChart";

const Dashboard = () => {
    const navigate = useNavigate();
    const [petCount, setPetCount] = useState(null);
    const [userCount, setUserCount] = useState(null);
    const [teamCount, setTeamCount] = useState(null);
    const [reservationTotal, setReservationTotal] = useState(null);
    const [avgDuration, setAvgDuration] = useState(null);
    const [orderCount, setOrderCount] = useState(null);

    const GetPetCount = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosClient.get("/pet-count");
            setPetCount(response.data);
        } catch (error) {
            console.error("Error fetching pets:", error);
            // localStorage.removeItem("token");
            navigate("/");
        }
    };
    const GetUserCount = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosClient.get("/user-count");
            setUserCount(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            // localStorage.removeItem("token");
            navigate("/");
        }
    };

    const GetTeamCount = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosClient.get("/team-count");
            setTeamCount(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            // localStorage.removeItem("token");
            navigate("/");
        }
    };

    const GetReservationTotalPrice = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosClient.get("/reservation-total");
            setReservationTotal(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            // localStorage.removeItem("token");
            navigate("/");
        }
    };

    const GetAvgDuration = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosClient.get(
                "/average-reservation-duration"
            );
            setAvgDuration(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            // localStorage.removeItem("token");
            navigate("/");
        }
    };

    const GetOrderTotal = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosClient.get("/order-count");
            setOrderCount(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            // localStorage.removeItem("token");
            navigate("/");
        }
    };

    useEffect(() => {
        GetUserCount();
        GetPetCount();
        GetTeamCount();
        GetReservationTotalPrice();
        GetAvgDuration();
        GetOrderTotal();
    }, []);

    return (
        <div className="flex h-screen bg-gray-50 ">
            <div className="flex flex-col flex-1 w-full mt-18">
                <main className="h-full overflow-y-auto">
                    <div className="container px-6 mx-auto grid">
                        <h2 className="my-6 text-2xl font-semibold text-gray-700">
                            Dashboard
                        </h2>
                        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                                <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600">
                                        Nombre d'Utilisateurs
                                    </p>
                                    <div className="text-lg font-semibold text-gray-700">
                                        {userCount?.user_count || (
                                            <div className="relative flex w-48 animate-pulse gap-2 p-4">
                                                <div className="h-5 w-[90%] rounded-lg bg-slate-300 text-sm"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                                <div className="p-3 mr-4 text-blue-500 text-xl bg-yellow-100 rounded-full ">
                                    <MdOutlinePets />
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600">
                                        Nombre d'animaux
                                    </p>
                                    <div className="text-lg font-semibold text-gray-700">
                                        {petCount?.pet_count || (
                                            <div className="relative flex w-48 animate-pulse gap-2 p-4">
                                                <div className="h-5 w-[90%] rounded-lg bg-slate-300 text-sm"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                                <div className="p-3 mr-4 text-white bg-blue-950 rounded-full ">
                                    <GiTeamIdea />
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600">
                                        Notre Staff
                                    </p>
                                    <div className="text-lg font-semibold text-gray-700">
                                        {teamCount?.team_member_count || (
                                            <div className="relative flex w-48 animate-pulse gap-2 p-4">
                                                <div className="h-5 w-[90%] rounded-lg bg-slate-300 text-sm"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs ">
                                <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full ">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600 =">
                                        Prix Total De Résérvations
                                    </p>
                                    <div className="text-lg flex items-center font-semibold text-gray-700 ">
                                        {reservationTotal?.reservation_total_price || (
                                            <div className="relative flex w-32 animate-pulse gap-2 p-4">
                                                <div className="h-5 w-[90%] rounded-lg bg-slate-300 text-sm"></div>
                                            </div>
                                        )}{" "}
                                        MAD
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                                <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
                                    <FcDepartment size={20} />
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600">
                                        Durée Moyenne de Résérvation
                                    </p>
                                    <div className="text-lg font-semibold text-gray-700 ">
                                        {Math.ceil(
                                            avgDuration?.duree_moyenne
                                        ) || (
                                            <div className="relative flex w-48 animate-pulse gap-2 p-4">
                                                <div className="h-5 w-[90%] rounded-lg bg-slate-300 text-sm"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs ">
                                <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full">
                                    <FcElectricalThreshold size={22} />
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600 ">
                                        Total de demandes
                                    </p>
                                    <div className="text-lg font-semibold text-gray-700 ">
                                        {orderCount?.order_total || (
                                            <div className="relative flex w-48 animate-pulse gap-2 p-4">
                                                <div className="h-5 w-[90%] rounded-lg bg-slate-300 text-sm"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container px-6 mx-auto grid grid-cols-2 gap-6">
                            <UserChart />
                            <OrderStatusChart />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;

function GridItem({ title, children }) {
    return (
        <div className="flex flex-col items-center justify-center p-4 border border-slate-900 bg-slate-900/50 rounded-xl h-[400px]">
            <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
            {children}
        </div>
    );
}
