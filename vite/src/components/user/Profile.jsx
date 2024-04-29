import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios";
import toast from "react-hot-toast";

const Profile = () => {
    const navigate = useNavigate();
    const [userInfos, setUserInfos] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axiosClient.get("/user-details");
                setUserInfos(response.data);
            } catch (error) {
                // Handle error
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    const deleteUser = (id) => {
        axiosClient
            .delete(`http://localhost:8000/api/delete-user/${id}`)
            .then((response) => {
                navigate('/')
                
            })
            .catch((error) => {
                console.error("Error deleting pet:", error);
            });
        toast.success("Votre compte a été supprimé avec succès.");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="flex items-center justify-center mt-20">
            <div className="bg-white w-2/3 mt-10 rounded-lg">
                {userInfos && (
                    <>
                        <div className="flex items-center justify-center pt-10 flex-col">
                            {/* <img
                        src="https://i.pinimg.com/originals/a8/bc/90/a8bc90ea196737604770aaf9c2d56a51.jpg"
                        className="rounded-full w-32"
                        /> */}
                            <h1 className="text-gray-800 font-semibold text-4xl mt-5">
                                BIENVENUE {userInfos.name.toUpperCase()}
                            </h1>
                            <h1 className="text-gray-500 text-base mt-2">
                                <b>Adresse :</b> {userInfos.adresse}
                            </h1>{" "}
                            {/* Added closing tag */}
                            <h1 className="text-gray-500 text-base mt-2">
                                <b>Téléphone :</b> {userInfos.telephone}
                            </h1>{" "}
                            <h1 className="text-gray-500 text-base mt-2">
                                <b>Crée le :</b>{" "}
                                {formatDate(userInfos.created_at)}
                            </h1>{" "}
                        </div>
                        <div className="flex justify-between p-6 mt-8">
                            <div>
                                <h1 className="text-base font-semibold uppercase text-gray-500">
                                    Role
                                </h1>
                                <h1 className="text-sm font-bold text-yellow-500">
                                    {userInfos.admin === 1 ? "Admin" : "User"}
                                </h1>{" "}
                            </div>
                            <div>
                                <button className="text-xs text-rose-600 hover:bg-white font-bold border-2 py-2 px-3 bg-red-300 border-red-400" onClick={()=>deleteUser(userInfos.id)}>
                                    Supprimer Compte
                                </button>
                            </div>
                        </div>
                        {/* <div className="flex items-center justify-center mt-3 mb-6 flex-col">
                    <h1 className="text-xs text-gray-500">Get Connected</h1>
                    <div className="flex mt-2">
                        <img
                            src="https://www.iconsdb.com/icons/preview/gray/facebook-xxl.png"
                            alt=""
                            className="w-6 border-2 p-1 rounded-full mr-3"
                        />
                        <img
                            src="https://www.iconsdb.com/icons/preview/gray/twitter-xxl.png"
                            alt=""
                            className="w-6 border-2 p-1 rounded-full mr-3"
                        />
                        <img
                            src="https://www.iconsdb.com/icons/preview/gray/google-plus-xxl.png"
                            alt=""
                            className="w-6 border-2 p-1 rounded-full mr-3"
                        />
                        <img
                            src="https://www.iconsdb.com/icons/preview/gray/instagram-6-xxl.png"
                            alt=""
                            className="w-6 border-2 p-1 rounded-full"
                        />
                    </div>
                </div> */}
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
