import { Link, useNavigate } from "react-router-dom";
import { useMenu } from "../../context/context";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { IoMdMenu, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

export const navItems = [
    {
        title: "Accueil",
        href: "/",
    },
    {
        title: "Adopter maintenant",
        href: "/all-animals",
    },
    {
        title: "Contact",
        href: "/contact",
    },
    {
        title: "A Propos",
        href: "/about",
    },
    {
        title: "PetSitter",
        href: "/hotel",
    },
];

const Navbar = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
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

    const { isLoggedIn, logout } = useAuth();
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axiosClient.get(
                    "http://127.0.0.1:8000/api/user-details"
                );
                const token = localStorage.getItem("token");
                setUserDetails(response.data);
                if (token) {
                    login();
                }
                setIsLoading(false);
            } catch (error) {
                console.log("You are Not logged In");
                // const token = localStorage.removeItem("token");
                setIsLoading(false);
            }
        };
        fetchUserDetails();
    }, []);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            {isLoading && (
                <div className="flex flex-row gap-2 ml-4 py-8">
                    <div className="w-4 h-4 rounded-full bg-amber-400 animate-bounce [animation-delay:.7s]"></div>
                    <div className="w-4 h-4 rounded-full bg-amber-400 animate-bounce [animation-delay:.3s]"></div>
                    <div className="w-4 h-4 rounded-full bg-amber-400 animate-bounce [animation-delay:.7s]"></div>
                </div>
            )}
            {token && !isLoading ? (
                <div className="navbar-right mr-0 py-4 sm:flex hidden items-center justify-between select-none">
                    <div
                        className="relative flex items-center cursor-pointer "
                        onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                        }}
                    >
                        <p className="text-white mt-4 mr-4 mb-4 inline-block">
                            Hello {userDetails.name.substring(0, 10)}...
                        </p>
                        <button
                            className="text-white focus:outline-none inline-block"
                            onClick={() => {
                                setIsDropdownOpen(!isDropdownOpen);
                            }}
                        >
                            {isDropdownOpen ? (
                                <IoMdArrowDropup className="text-2xl" />
                            ) : (
                                <IoMdArrowDropdown className="text-2xl" />
                            )}
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute bg-white top-full mt-1 rounded shadow-md">
                                <ul>
                                    <li className="py-2 px-4 hover:bg-gray-200 w-full">
                                        <Link
                                            to={"/user/profile"}
                                            className="w-full"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="py-2 px-4 hover:bg-gray-200">
                                        <Link to={"/user/orders"}>
                                            Demandes
                                        </Link>
                                    </li>
                                    <li className="py-2 px-4 hover:bg-gray-200">
                                        <Link to={"/user/reservations"}>
                                            Reservations
                                        </Link>
                                    </li>
                                    <li className="py-2 px-4 text-black hover:bg-red-600 hover:text-white">
                                        <button
                                            className="focus:outline-none"
                                            onClick={() => {
                                                localStorage.removeItem(
                                                    "token"
                                                );
                                                logout;
                                                navigate("/");
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {!isLoading && (
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
                </>
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
