import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { axiosClient } from "../api/axios";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { BiFilter } from "react-icons/bi";

const Animals = () => {
    const [animals, setAnimals] = useState([]);
    const [displayedAnimals, setDisplayedAnimals] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({
        sexe: "",
        age: "",
        race: "",
    });
    const [showSearchForm, setShowSearchForm] = useState(false); // État pour gérer la visibilité du formulaire de recherche
    const initialCount = 6;
    const additionalCount = 15;

    useEffect(() => {
        const fetchAllAnimals = async () => {
            try {
                const response = await axiosClient.get(
                    "http://localhost:8000/api/filter-pets",
                    { params: searchCriteria }
                );
                setAnimals(response.data.pets);
            } catch (error) {
                console.error("Error fetching animals:", error);
            }
        };

        fetchAllAnimals();
    }, [searchCriteria]);

    useEffect(() => {
        if (showMore) {
            setDisplayedAnimals(
                animals.slice(0, initialCount + additionalCount)
            );
        } else {
            setDisplayedAnimals(animals.slice(0, initialCount));
        }
    }, [animals, showMore]);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const toggleShowMore = () => {
        setShowMore((prevState) => !prevState);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredAnimals = animals.filter((animal) => {
            // Vérifier si les critères de recherche correspondent à ceux de l'animal
            const isSexeMatch =
                searchCriteria.sexe === "" ||
                animal.sexe.toLowerCase() === searchCriteria.sexe.toLowerCase();
            const isAgeMatch =
                searchCriteria.age === "" ||
                animal.age === parseInt(searchCriteria.age);
            const isEspeceMatch =
                searchCriteria.espece === "" ||
                animal.espece
                    .toLowerCase()
                    .includes(searchCriteria.espece.toLowerCase());
            return isSexeMatch && isAgeMatch && isEspeceMatch;
        });
        setDisplayedAnimals(filteredAnimals);
    };

    const toggleSearchForm = () => {
        setShowSearchForm((prevState) => !prevState);
    };

    return (
        <div>
            <div className="flex justify-end items-center mr-8 mt-40">
                <button
                    onClick={toggleSearchForm}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                >
                    <BiFilter className="mr-2" /> Search by
                </button>
            </div>
            {showSearchForm && ( // Afficher le formulaire de recherche si showSearchForm est vrai
                <div className="flex justify-center mt-8">
                    <form
                        onSubmit={handleSearch}
                        className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center"
                        style={{ maxWidth: "400px" }}
                    >
                        <h2 className="text-xl font-semibold mb-4">
                            Search Animals
                        </h2>
                        <div className="mb-4 w-full">
                            <input
                                type="text"
                                placeholder="Sexe"
                                value={searchCriteria.sexe}
                                onChange={(e) =>
                                    setSearchCriteria({
                                        ...searchCriteria,
                                        sexe: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4 w-full">
                            <input
                                type="text"
                                placeholder="Age"
                                value={searchCriteria.age}
                                onChange={(e) =>
                                    setSearchCriteria({
                                        ...searchCriteria,
                                        age: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4 w-full">
                            <input
                                type="text"
                                placeholder="Espece"
                                value={searchCriteria.espece}
                                onChange={(e) =>
                                    setSearchCriteria({
                                        ...searchCriteria,
                                        espece: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Search
                        </button>
                    </form>
                </div>
            )}
            <div className="justify-center mt-28" data-aos="fade-up">
                <div className="text-center mb-2.5 text-3xl font-bold">
                    <h3 className="text-red-500">Adoptable Animals</h3>
                </div>
                <div className="text-center text-sm">
                    <p>Browse through our selection of featured animals.</p>
                </div>
            </div>
            <div className="flex items-center justify-center min-h-screen container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {displayedAnimals.map((animal) => (
                        <div
                            key={animal.id}
                            className="rounded-xl bg-white shadow-lg mt-12 ml-4"
                            data-aos="fade-up"
                        >
                            <div className="p-5 flex flex-col">
                                <div className="rounded-xl overflow-hidden max-h-64 max-w-80 drop-shadow-md">
                                    <img
                                        src={`http://localhost:8000/storage/${animal.photo}`}
                                        alt={animal.nom}
                                        className="object-cover min-h-80 min-w-72"
                                    />
                                </div>
                                <h5 className="text-2xl text-green-400 font-poppins font-bold md:text-3xl mt-3">
                                    {animal.nom}
                                </h5>

                                <p className="text-slate-800 font-poppins text-lg mt-3">
                                    <b>Age:</b> {animal.age}
                                </p>

                                <p className="text-slate-800 font-poppins text-lg mt-3">
                                    <b>Espece:</b> {animal.espece}
                                </p>

                                <p className="text-slate-800 font-poppins text-lg mt-3">
                                    <b>Sexe:</b> {animal.sexe}
                                </p>

                                <p className="text-slate-800 font-poppins text-lg mt-3">
                                    <b>Santé:</b> {animal.sante}
                                </p>

                                <p className="text-slate-800 font-poppins text-lg mt-3 description-wrap">
                                    <b>Description:</b>{" "}
                                    {animal.description.substring(0, 40)}...
                                </p>
                                <a
                                    onClick={() => {
                                        localStorage.setItem(
                                            "CurrentPath",
                                            `/order/${animal.id}`
                                        );
                                    }}
                                    href={`/order/${animal.id}`}
                                    className="text-center bg-green-800 rounded-xl py-3 px-2 mt-4 font-semibold hover:bg-slate-400 focus:scale-75 transition-all duration-250 ease-out"
                                >
                                    Voir Details
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center mt-8">
                <button
                    onClick={toggleShowMore}
                    className="bg-amber-400 hover:bg-amber-500 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    {showMore ? "Show Less" : "Show More"}
                </button>
            </div>
        </div>
    );
};

export default Animals;
