import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import image1 from "./assets/image1.jpeg";
import image2 from "./assets/image2.jpeg";
import image3 from "./assets/image3.jpeg";
import image4 from "./assets/image4.jpeg";
import image5 from "./assets/image5.jpeg";
import image6 from "./assets/image6.jpeg";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialise AOS avec une durée de 1 seconde
  }, []);

  const teamMembers = [
    {
      name: "Sophie Berger",
      role: "Directrice de l'Adoption",
      description:
        "Sophie supervise le processus d'adoption, veillant à ce que les animaux trouvent des foyers aimants et adaptés.",
      photo: image6
    },
    {
      name: "Lucas Dupont",
      role: "Responsable des Soins Vétérinaires",
      description:
        "Lucas coordonne les soins médicaux et vétérinaires des animaux recueillis, assurant leur santé et leur bien-être.",
      photo: image1
    },
    {
      name: "Emma Lambert",
      role: "Coordinatrice des Événements",
      description:
        "Emma organise des événements de collecte de fonds et de sensibilisation pour soutenir les activités de l'association et encourager l'adoption.",
      photo: image2
    },
    {
      name: "Thomas Martin",
      role: "Coordinateur des Bénévoles",
      description:
        "Thomas recrute, forme et gère les bénévoles qui offrent leur temps et leur soutien pour aider les animaux et l'organisation.",
      photo: image3
    },
    {
      name: "Camille Leroy",
      role: "Responsable des Réseaux Sociaux",
      description:
        "Camille gère la présence en ligne de l'association, partageant des histoires d'animaux à adopter et promouvant des campagnes de sensibilisation.",
      photo: image4
    },
    {
      name: "Antoine Rousseau",
      role: "Coordinateur des Adoptions",
      description:
        "Antoine guide les familles potentielles à travers le processus d'adoption, assurant des correspondances réussies entre les animaux et leurs nouveaux propriétaires.",
      photo: image5
    }
  ];

  return (
    <div className="mb-10">
      <div className="justify-center mt-24" data-aos="fade-up">
        <div className="text-center mb-2.5 text-3xl font-bold" data-aos="fade-up">
          <h3  className="text-amber-500">Meet Our Team</h3>
        </div>
        <div className="text-center text-sm">
          <p>Découvrez les membres dévoués de notre centre d'adoption.</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center space-y-2 rounded-full mt-10" data-aos="fade-up">
            <img
              src={member.photo}
              alt={member.name}
              className="w-16 h-16 rounded-full"
            />
            <h3 className="text-xl font-bold text-center text-amber-500">{member.name}</h3>
            <b className="text-lg text-center text-green-900">{member.role}</b>
            <p className="text-lg text-center">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
