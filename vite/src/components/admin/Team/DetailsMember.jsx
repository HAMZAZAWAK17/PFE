import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosClient } from "../../api/axios";

const DetailsMember = () => {
    const { memberId } = useParams();
    const [data, setData] = useState({
        nom: "",
        image: "",
        title: "",
        description: "",
    });

    useEffect(() => {
        axiosClient
            .get(`http://localhost:8000/api/details-member/${memberId}`)
            .then((response) => {
                setData(response.data.team);
            })
            .catch((error) => {
                console.error("Error fetching pet:", error);
            });
    }, [memberId]);

    return (
        <div className="flex justify-center items-center h-screen mt-28">
            <div className="max-w-lg p-8 bg-gray-100 rounded-lg shadow-md">
                {data.image && (
                    <div>
                        <img
                            src={`http://localhost:8000/storage/${data.image}`}
                            alt=""
                        />{" "}
                    </div>
                )}
                <div>
                    <h2 className="font-bold text-3xl mt-4 mb-2">{data.nom}</h2>
                    <p>
                        <b>Fonction : </b> {data.title}
                    </p>
                    <p className="mt-2 max-w-full overflow-wrap-normal">
                        <b>Description : </b> {data.description}
                    </p>
                    <p className="mt-2 max-w-full overflow-wrap-normal">
                        <b>Téléphone :</b> {data.telephone}
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

export default DetailsMember;
