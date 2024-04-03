import { CgMail } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import contact from "./assets/contact.jpg";

const Contact = () => {
  return (
    <div className="mt-24 ml-14">
      <div className="mb-12">
        <h2 className="text-4xl font-semibold mb-2">Contactez-nous.</h2>
        <p>Ouvert du Lundi au Samedi ,9h à 15h</p>
      </div>
      <div className="flex">
        <div className="w-44">
          <div className="mb-12">
            <CgMail size={50} />
            <h4 className="ml-1 text-2xl font-medium">Email</h4>
            <p className="ml-1 underline">info@animaladoptioncenter.com</p>
          </div>
          <div className="mb-12">
            <FaPhoneAlt size={40} />
            <h4 className="ml-1 text-2xl mt-3 font-medium">Téléphone</h4>
            <p className="ml-1 underline">+212000000000</p>
          </div>
          <div className="mb-12">
            <IoLocationSharp size={50} />
            <h4 className="ml-1 text-2xl font-medium">Adresse</h4>
            <p className="ml-1 underline">Boulevard Fes Ain chock Casablanca</p>
          </div>
        </div>
        <div>
          <img
            src={contact}
            alt=""
            className="h-96 w-3/5 ml-96 mt-12 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
