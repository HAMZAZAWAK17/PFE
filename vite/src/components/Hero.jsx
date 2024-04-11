import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Typed from "typed.js";
import hero1 from "./assets/hero1.png";

const Hero = () => {
    const typedRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialise AOS avec une durée de 1 seconde

    const options = {
      strings: [
        "Accueillez un nouveau membre dans votre famille.",
        "Adoptez votre compagnon"
      ], // Utilisez la phrase comme première chaîne de caractères dans le tableau strings
      typeSpeed: 50, // Vitesse de frappe des caractères
      backSpeed: 50, // Vitesse de suppression des caractères
      loop: true // Boucler l'animation
    };


        // Initialise Typed.js avec les options
        const typed = new Typed(typedRef.current, options);

        // Nettoie l'animation lorsque le composant est démonté
        return () => {
            typed.destroy();
        };
    }, []);


    return (
        <div className="flex">
            <div className="ml-28 w-96 mt-40">
                <h1 className="text-4xl text-slate-800 mb-8 font-bold select-none">
                    Explorez nos adorables <br /> compagnons à adopter.{" "}
                    <span ref={typedRef}></span>
                </h1>
                <p className="text-xl select-none">Adoptez votre compagnon</p>
                <div>
                    <a
                        href="#pets"
                        className="bg-amber-400 rounded-2xl rounded-5 text-xl font-bold p-2.5 select-none"
                    >
                        <button className="mt-4 ">
                            Rencontrez nos animaux !!
                        </button>
                    </a>
                </div>
            </div>
            <div className="relative w-7/12 mr-12" data-aos="fade-left">
                <img
                    className="absolute mt-44 z-0 select-none"
                    src={hero1}
                    alt=""
                />
            </div>
        </div>
    );
};

export default Hero;
