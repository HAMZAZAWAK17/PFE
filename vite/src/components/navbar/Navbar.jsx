import { Link, useNavigate } from "react-router-dom";
import { useMenu } from "../context/context";
import "./Navbar.css";
import { IoMdMenu } from "react-icons/io";
import Register from "../Register";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const navItems = [
    {
        title: "Accueil",
        href: "/",
    },
    {
        title: "Adopter maintenant",
        href: "/pets",
    },
    {
        title: "Contact",
        href: "/contact",
    },
    {
        title: "A Propos",
        href: "/about",
    },
];

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { openMenu, closeMenu, isMenuOpen } = useMenu();
    const [userDetails, setUserDetails] = useState({
        id: null,
        name: "",
        email: "",
        email_verified_at: null,
        admin: null,
        created_at: null,
        updated_at: null,
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (!token) {
                    navigate("/");
                    return;
                }

                const response = await axios.get(
                    "http://127.0.0.1:8000/api/user-detail",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUserDetails(response.data);
                setIsLoggedIn(true); 
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.log(error)
                    navigate("/");
                } else {
                    console.error("Error fetching user details:", error);
                }
            }
        };
        fetchUserDetails();
    }, []);

    return (
        <header className="header font-poppins bg-slate-800 fixed top-0 left-0 w-full px-100 flex justify-between items-center z-10">
            <Link
                to="/"
                className="logo mr-6 text-23 font-extra-bold text-amber-600 w-17 select-none outline-none hover:scale-105 transition-transform duration-300"
            >
                Furry Buddies
            </Link>
            <nav className="navbar ml-10 items-center sm:flex hidden lg:flex-1">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.href}
                        className="mr-10 outline-none text-amber-400 font-500 text-14 select-none hover:underline underline-offset-4"
                    >
                        {item.title}
                    </Link>
                ))}
            </nav>
            {token ? (
                <div className="navbar-right mr-0 py-4 sm:flex hidden items-center justify-between">
                    <p className="text-white mr-4">Hello {userDetails.name}</p>
                    <button
                        className="select-none bg-amber-400 hover:bg-white hover:text-black px-4 pt-2.5 pb-2.5 rounded-3xl mr-4 text-black font-500 text-14 py-7 px-15 rounded-5"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/");
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="navbar-right mr-0 sm:flex hidden items-center justify-between">
                    <Link to="/signup">
                        <button className="select-none bg-amber-400 hover:bg-white hover:text-black px-4 pt-2.5 pb-2.5 rounded-3xl mr-4 text-black font-500 text-14 py-7 px-15 rounded-5">
                            Register
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="select-none bg-transparent border-0 text-white hover:text-amber-500 font-500 text-14 py-7 px-15 rounded-5">
                            Log in
                        </button>
                    </Link>
                </div>
            )}
            <div className="navbar-right mr-0 sm:hidden flex items-center justify-between">
                {isMenuOpen ? (
                    ""
                ) : (
                    <IoMdMenu
                        onClick={openMenu}
                        className="text-3x1 text-amber-400 cursor-pointer"
                    />
                )}
            </div>
        </header>
    );
};

export default Navbar;
