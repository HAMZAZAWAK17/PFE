import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import signup from "../assets/signup.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

const Login = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            navigate("/");
            toast.error("Vous etes déja inscris");
        }
    }, [token, navigate]);

    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        trigger,
    } = useForm();

    const Submit = async (data) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                data
            );

            const token = response.data.authorisation.token;

            localStorage.setItem("token", token);
            const currentPath = localStorage.getItem("CurrentPath");
            toast.success("Connecté avec succes !");
            console.log(currentPath);
            if (currentPath) {
                navigate(currentPath);
                localStorage.removeItem("CurrentPath");
            } else {
                navigate("/");
            }
            return;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("Les données saisis sont incorrectes");
            } else {
                const responseData = error.response.data;
                setValidationErrors(responseData);
                if (responseData) {
                    setValidationErrors(responseData);
                } else {
                    toast.error("Une erreur a survenu");
                }
            }
        }
    };

    return (
        <div className="flex mt-36">
            <div className="w-1/2 ml-20 mb-3">
                <img src={signup} className="rounded-3xl" alt="" />
            </div>
            <form
                onSubmit={handleSubmit(Submit)}
                className="bg-gradient-to-r from-neutral-900 to-sky-950 max-w-max min-w-96 shadow-md font-poppins rounded-3xl px-8 pt-6 pb-8 ml-20 mb-4"
            >
                <h2 className="text-white mb-4 text-4xl">Login</h2>
                <div className="mb-4 mt-16">
                    <label
                        htmlFor="email"
                        className="block text-amber-400 text-sm font-bold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        // value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Ce champ est requis",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "la syntax email n'est pas valide",
                            },
                        })}
                        onBlur={() => trigger("email")}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-amber-400 text-sm font-bold mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        // value={formData.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Mot de passe requis",
                            minLength: {
                                value: 6,
                                message:
                                    "Le mot de passe doit avoir au moins 8 caractères",
                            },
                            // pattern: {
                            //     value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            //     message:
                            //         "Le mot de passe doit contenirune lettre et un chiffre",
                            // },
                        })}
                        onBlur={() => trigger("password")}
                    />
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="hover:bg-gray-50 bg-amber-400 duration-100 hover:px-5 hover:py-3 text-slate-950 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Log In
                    </button>
                </div>
                <p className="mt-3 text-white">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="underline hover:text-amber-400"
                    >
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
