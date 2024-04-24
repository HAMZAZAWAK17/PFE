import React, { useEffect, useState } from "react";
import signup from "./assets/signup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "./api/axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const Register = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        adresse: "",
        telephone: "",
        password: "",
        admin: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
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
            const response = await axiosClient.post(
                "http://127.0.0.1:8000/api/register",
                data
            );
            const responseData = response.data;
            if (response.status === 200) {
                toast.success("Inscription effectué avec succes");
                navigate("/login");
            }
        } catch (error) {
            toast.error("Une erreur a prévu");
        }
    };

    return (
        <div className="flex mt-24">
            <form
                onSubmit={handleSubmit(Submit)}
                className="bg-gradient-to-r from-neutral-900 to-sky-950 max-w-max min-w-96 shadow-md font-poppins rounded-3xl px-8 pt-6 pb-8 ml-20 mb-4"
            >
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-amber-400 text-sm font-bold mb-2"
                    >
                        Nom
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-100 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
                        placeholder="Entrez votre nom"
                        {...register("name", {
                            required: "Ce champ est requis",
                            minLength: {
                                value: 2,
                                message:
                                    "Le prénom doit etre au moins 2 characteres",
                            },
                            pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "Ce champ doit être alphabétique",
                            },
                        })}
                        onBlur={() => trigger("name")}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">
                            {errors.name.message}
                        </span>
                    )}
                </div>
                <div className="mb-4">
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
                        // value={data.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-100 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
                        placeholder="Entrez votre email"
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
                <div className="mb-4">
                    <label
                        htmlFor="adresse"
                        className="block text-amber-400 text-sm font-bold mb-2"
                    >
                        Adresse
                    </label>
                    <input
                        type="text"
                        id="adresse"
                        name="adresse"
                        // value={data.adresse}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-100 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
                        placeholder="Entrez votre adresse"
                        {...register("adresse", {
                            required: "Ce champ est requis",
                        })}
                        onBlur={() => trigger("adresse")}
                    />
                </div>
                {errors.adresse && (
                    <span className="text-red-500 text-sm">
                        {errors.adresse.message}
                    </span>
                )}
                <div className="mb-4">
                    <label
                        htmlFor="telephone"
                        className="block text-amber-400 text-sm font-bold mb-2"
                    >
                        Numéro de téléphone
                    </label>
                    <input
                        type="text"
                        id="numeroTelephone"
                        name="telephone"
                        // value={data.numeroTelephone}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-100 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
                        placeholder="Entrez votre numéro de téléphone"
                        {...register("telephone", {
                            required: "Numéro de téléphone requis",
                            pattern: {
                                value: /^\d{10}$/,
                                message: "Invalide ex.'(0600000000)'",
                            },
                        })}
                        onBlur={() => trigger("telephone")}
                    />
                    {errors.telephone && (
                        <span className="text-red-500 text-sm">
                            {errors.telephone.message}
                        </span>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-amber-400 text-sm font-bold mb-2"
                    >
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        // value={data.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-100 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
                        placeholder="Entrez votre mot de passe"
                        {...register("password", {
                            required: "Mot de passe requis",
                            minLength: {
                                value: 6,
                                message:
                                    "Le mot de passe doit avoir au moins 8 caractères",
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message:
                                    "Le mot de passe doit contenirune lettre et un chiffre",
                            },
                        })}
                        onBlur={() => trigger("password")}
                    />
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-amber-400 text-sm font-bold mb-2"
                    >
                        Confirmer Mot De Passe
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-100 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
                        placeholder="Confirmer votre mot de passe"
                        {...register("confirmPassword", {
                            required: "The confirmation is required",
                            validate: (value) =>
                                value === watch("password") ||
                                "Passwords do not match",
                        })}
                        onBlur={() => trigger("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="hover:bg-gray-50 bg-amber-400 duration-100 hover:px-5 hover:py-3 text-slate-950 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign Up
                    </button>
                </div>
                <p className="mt-3 text-white">
                    J'ai déjà un compte ?{" "}
                    <Link
                        to="/login"
                        className="underline hover:text-amber-400"
                    >
                        Se connecter
                    </Link>
                </p>
            </form>
            <div className="w-1/2 ml-20 mt-16">
                <img src={signup} className="rounded-3xl" alt="" />
            </div>
        </div>
    );
};

export default Register;
