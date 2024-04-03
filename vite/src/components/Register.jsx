import React, { useState } from "react";
import signup from "./assets/signup.jpg";
import { Link, useNavigate } from "react-router-dom";
// import axios from "./api/axios";
import axios from "axios";
import Swal from "sweetalert2";

const SignUp = () => {
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formdata
      );

      const responseData = response.data;
      if (response.status === 200) {
        setValidationErrors({});
        Swal.fire({
          icon: "success",
          title: "Success",
          text: responseData.message,
        }).then(() => {
          navigate("/login");
        });
      } else {
        setValidationErrors(responseData);
        if (responseData) {
          setValidationErrors(responseData);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: responseData || "Registration failed.",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred during registration.",
      });
    }
  };

  return (
    <div className="flex mt-24">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-neutral-900 to-sky-950 max-w-max min-w-96 shadow-md font-poppins rounded-3xl px-8 pt-6 pb-8 ml-20 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="nom"
            className="block text-amber-400 text-sm font-bold mb-2"
          >
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="name"
            // value={data.nom}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-100 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
            placeholder="Entrez votre nom"
          />
          {validationErrors.name && (
            <span className="text-danger">{validationErrors.name[0]}</span>
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
          />
          {validationErrors.email && (
            <span className="text-danger">{validationErrors.email[0]}</span>
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
          />
        </div>
        {validationErrors.adresse && (
            <span className="text-danger">{validationErrors.password[0]}</span>
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
          />
          {validationErrors.telephone && (
            <span className="text-danger">{validationErrors.password[0]}</span>
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
          />
          {validationErrors.password && (
            <span className="text-danger">{validationErrors.password[0]}</span>
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
          <Link to="/login" className="underline hover:text-amber-400">
            Se connecter
          </Link>
        </p>
      </form>
      <div className="w-1/2 ml-20 mt-24">
        <img src={signup} className="rounded-3xl" alt="" />
      </div>
    </div>
  );
};

export default SignUp;













// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import axios from "axios";

// const Register = () => {
//   const [formdata, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     admin: false,
//   });
//   const [validationErrors, setValidationErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formdata, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/register",
//         formdata
//       );

//       const responseData = response.data;
//       if (response.status === 200) {
//         setValidationErrors({});
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: responseData.message,
//         }).then(() => {
//           window.location.href = "/login";
//         });
//       } else {
//         setValidationErrors(responseData);
//         if (responseData) {
//           setValidationErrors(responseData);
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: responseData || "Registration failed.",
//           });
//         }
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "An error occurred during registration.",
//       });
//     }
//   };

//   // const imagePath = process.env.PUBLIC_URL + "/images/bg-image.webp";

//   return (
//     <section
//       className="vh-100 bg-image"
//       // style={{ backgroundImage: `url('${imagePath}')` }}
//     >
//       <div className="mask mt-36 d-flex align-items-center h-100 gradient-custom-3">
//         <div className="container h-100">
//           <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col-12 col-md-9 col-lg-7 col-xl-6">
//               <div className="card" style={{ borderRadius: "15px" }}>
//                 <div className="card-body p-5">
//                   <h2 className="text-uppercase text-center mb-5">
//                     Create an account
//                   </h2>
//                   <form method="POST" onSubmit={handleSubmit}>
//                     <div className="form-outline mb-4">
//                       {/* <label htmlFor="name"  className="form-label">Name:</label> */}
//                       <input
//                         type="text"
//                         name="name"
//                         placeholder="Enter Full Name"
//                         className="form-control form-control-lg"
//                         onChange={handleChange}
//                       />
//                       {validationErrors.name && (
//                         <span className="text-danger">
//                           {validationErrors.name[0]}
//                         </span>
//                       )}
//                     </div>
//                     <div className="form-outline mb-4">
//                       {/* <label htmlFor="email" className="form-label">Email:</label> */}
//                       <input
//                         type="email"
//                         name="email"
//                         placeholder="Enter Email"
//                         className="form-control form-control-lg"
//                         onChange={handleChange}
//                       />
//                       {validationErrors.email && (
//                         <span className="text-danger">
//                           {validationErrors.email[0]}
//                         </span>
//                       )}
//                     </div>
//                     <div className="form-outline mb-4">
//                       {/* <label htmlFor="password" className="form-label">Password:</label> */}
//                       <input
//                         type="Password"
//                         name="password"
//                         placeholder="Enter Password"
//                         className="form-control form-control-lg"
//                         onChange={handleChange}
//                       />
//                       {validationErrors.password && (
//                         <span className="text-danger">
//                           {validationErrors.password[0]}
//                         </span>
//                       )}
//                     </div>
//                     <div class="d-flex justify-content-center">
//                       <button
//                         type="submit"
//                         class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
//                       >
//                         Register
//                       </button>
//                     </div>
//                   </form>
//                   <p className="text-center text-muted mt-5 mb-0">
//                     Have already an account?{" "}
//                     <a href="/login" className="fw-bold text-body">
//                       <u>Login here</u>
//                     </a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Register;