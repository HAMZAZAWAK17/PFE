import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import sendmessage from "../assets/login.jpg";
import toast from "react-hot-toast";


export const SendMessage = () => {

    const handleReturn = () => {
        navigate("/");
    };

    const form = useRef();
    const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

    const sendEmail = (e) => {
        e.preventDefault();

        // Vérifiez si tous les champs sont remplis
        const formData = new FormData(form.current);
        const values = Object.fromEntries(formData.entries());
        const { user_name, user_email, message } = values;

        if (!user_name || !user_email || !message) {
            toast.success("Veuillez remplir tous les champs !");
            return;
        }

        // Envoyez le formulaire s'il est valide
        emailjs
            .sendForm("service_3speqgp", "template_n8ncqal", form.current, {
                publicKey: "exI2rOT2VmOWzsFl8",
            })
            .then(
                () => {
                    toast.success("Message envoyé avec succès !");
                    console.log("SUCCESS!");
                },
                (error) => {
                    toast.error("Échec de l'envoi du message !");
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
            <button className="Btn absolute top-4 left-4" onClick={handleReturn}>
                <div className="sign">
                    <svg viewBox="0 0 512 512">
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                </div>
                <div className="text">Home</div>
            </button>
            <div className="form-cont mt-11">
                <div className="form ">
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
    );
};

export default SendMessage;
