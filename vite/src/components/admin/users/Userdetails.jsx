import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosClient } from "../../api/axios";

const Userdetails = () => {
    const { userId } = useParams();
    const [data, setData] = useState({
        name: "",
        email: "",
        adresse: "",
        telephone: "",
        created_at: ""
    });

    useEffect(() => {
        axiosClient
            .get(`http://localhost:8000/api/details-user/${userId}`)
            .then((response) => {
                setData(response.data.user);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    }, [userId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-lg p-8 bg-gray-100 rounded-lg shadow-md">
                <div>
                    <h2 className="font-bold text-3xl mt-4 mb-2">{data.name}</h2>
                    <p>
                        <b>Email : </b> {data.email}
                    </p>
                    <p className="mt-2 max-w-full overflow-wrap-normal">
                        <b>Téléphone : </b> {data.telephone}
                    </p>
                    <p className="mt-2 max-w-full overflow-wrap-normal">
                        <b>Adresse : </b> {data.adresse}
                    </p>
                    <p className="mt-2 max-w-full overflow-wrap-normal">
                        <b>Crée le :</b> {formatDate(data.created_at)}
                    </p>
                </div>
            </div>
            <Link
                to="/admin/team-dashboard"
                className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-20"
            >
                Back
            </Link>
        </div>
    );
};

export default Userdetails;