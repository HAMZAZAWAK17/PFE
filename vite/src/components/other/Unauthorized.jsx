import React from "react";
import UnauthorizedP from "../assets/Unauthorized.jpg";
import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${UnauthorizedP})`,
            }}
            className="absolute inset-0 bg-cover bg-center mt-18"
        >
            <div className="absolute bottom-8 flex justify-center w-full">
                <button className="bg-black hover:bg-slate-700 text-white font-bold py-3 px-5 rounded-xl">
                    <Link to={"/"}>Return</Link>
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;
