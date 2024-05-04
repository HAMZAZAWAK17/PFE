import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/contact.jpg";

const AccueilHotel = () => {
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate("/");
    };

    const handleReservationClick = () => {
        navigate("/hotel/reserve");
    };

    return (
        <div className="flex">
            {/* Colonne de gauche pour le texte et les boutons */}
            <div className="w-1/2 bg-blue-900 text-yellow-400 p-8">
                <div className="content">
                    <button
                        className="Btn absolute top-4 left-4 fade-in"
                        onClick={handleReturn}
                    >
                        <div className="sign">
                            <svg viewBox="0 0 512 512">
                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                            </svg>
                        </div>
                        <div className="text">Home</div>
                    </button>
                    <div className="title-container fade-in">
                        <h1 className="title-h1 mt-44">
                            <b className="text-yellow-400">
                                WELCOME TO FURRY BUDDIES HOTEL
                            </b>
                        </h1>
                    </div>
                    <div className="description-container fade-in">
                        <b className="description-p">
                            Laissez vos animaux ici lors de votre travail ou de
                            vos vacances et nous nous occuperons d'eux avec
                            amour!
                        </b>
                    </div>
                    <div className="button-container mt-12 fade-in">
                        <button
                            className="button-hotel bg-blue-900"
                            onClick={handleReservationClick}
                        >
                            Allez au réservation
                        </button>
                    </div>
                </div>
            </div>
            {/* Colonne de droite pour l'image */}
            <div className="w-1/2 relative">
                <div
                    className="background-image absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                ></div>
            </div>
        </div>
    );
};

export default AccueilHotel;
