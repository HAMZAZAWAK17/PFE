import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import sendmessage from "./assets/sendmessage.png";

export const SendMessage = () => {
    const form = useRef();
    const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

    const sendEmail = (e) => {
        e.preventDefault();

        // Vérifiez si tous les champs sont remplis
        const formData = new FormData(form.current);
        const values = Object.fromEntries(formData.entries());
        const { user_name, user_email, message } = values;

        if (!user_name || !user_email || !message) {
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Veuillez remplir tous les champs !",
            });
            return;
        }

        // Envoyez le formulaire s'il est valide
        emailjs
            .sendForm("service_3speqgp", "template_n8ncqal", form.current, {
                publicKey: "exI2rOT2VmOWzsFl8",
            })
            .then(
                () => {
                    Swal.fire({
                        icon: "success",
                        title: "Succès",
                        text: "Message envoyé avec succès !",
                    });
                    console.log("SUCCESS!");
                },
                (error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Erreur",
                        text: "Échec de l'envoi du message !",
                    });
                    console.log("FAILED...", error.text);
                }
            );
    };

    const handleCancel = () => {
        // Rediriger vers la page principale
        navigate("/");
    };

    return (
        <div className="cont">
            <div className="form-cont">
                <div className="form">
                    <span className="heading">Contactez nous</span>
                    <form ref={form} onSubmit={sendEmail}>
                        <input
                            placeholder="Nom"
                            type="text"
                            name="user_name"
                            className="input"
                        />
                        <input
                            placeholder="Email"
                            type="email"
                            name="user_email"
                            className="input"
                        />
                        <textarea
                            placeholder="Message"
                            rows="10"
                            cols="30"
                            name="message"
                            className="textarea"
                        ></textarea>
                        <div className="button-cont">
                            <button type="submit" className="send-button">
                                Envoyer
                            </button>
                            <div className="reset-button-cont">
                                <button
                                    type="button"
                                    className="reset-button"
                                    onClick={handleCancel}
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="image-cont">
                <img
                    src={sendmessage}
                    alt="Confirmation"
                    className="h-auto w-auto max-h-full max-w-full"
                />
            </div>
        </div>
};

export default SendMessage;
