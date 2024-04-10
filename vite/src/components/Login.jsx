import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import signup from "./assets/signup.jpg";

const Login = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        formData
      );

      const token = response.data.authorisation.token;

      localStorage.setItem("token", token);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
      }).then(() => {
        // if (admin === 1) {
        //   navigate("/admin-dashboard");
        // }
        navigate("/");
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
      } else {
        const responseData = error.response.data;
        setValidationErrors(responseData);
        if (responseData) {
          setValidationErrors(responseData);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: responseData || "Login failed.",
          });
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
        onSubmit={handleSubmit}
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
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
          />
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
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            required
          />
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
          <Link to="/signup" className="underline hover:text-amber-400">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [validationErrors, setValidationErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/login",
//         formData
//       );

//       const token = response.data.authorisation.token;

//       localStorage.setItem("token", token);

//       Swal.fire({
//         icon: "success",
//         title: "Login Successful",
//         text: "Welcome back!",
//       }).then(() => {
//         navigate("/");
//       });
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: "Invalid email or password. Please try again.",
//         });
//       } else {
//         const responseData = error.response.data;
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
//     }
//   };
//   const imagePath = process.env.PUBLIC_URL + "/images/bg-image.webp";

//   return (
//     <section
//       className="vh-100 bg-image"
//       style={{ backgroundImage: `url('${imagePath}')` }}
//     >
//       <div className="mask d-flex align-items-center h-100 gradient-custom-3">
//         <div className="container h-100">
//           <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col-12 col-md-9 col-lg-7 col-xl-6">
//               <div className="card" style={{ borderRadius: "15px" }}>
//                 <div className="card-body p-5">
//                   <h2 className="text-uppercase text-center mb-5">Login</h2>
//                   <form method="POST" onSubmit={handleSubmit}>
//                     <div className="form-outline mb-4">
//                       <input
//                         type="text"
//                         name="email"
//                         placeholder="Enter Email"
//                         className="form-control"
//                         onChange={handleChange}
//                       />
//                       {validationErrors.email && (
//                         <span className="text-danger">
//                           {validationErrors.email[0]}
//                         </span>
//                       )}
//                     </div>
//                     <div className="form-outline mb-4">
//                       <input
//                         type="password"
//                         name="password"
//                         placeholder="Enter Password"
//                         className="form-control"
//                         onChange={handleChange}
//                       />
//                       {validationErrors.password && (
//                         <span className="text-danger">
//                           {validationErrors.password[0]}
//                         </span>
//                       )}
//                     </div>
//                     <button type="submit" className="btn btn-primary mt-4">
//                       Submit
//                     </button>
//                   </form>

//                   <p className="text-center text-muted mt-5 mb-0">
//                     Not an account?{" "}
//                     <a href="/register" className="fw-bold text-body">
//                       <u>Register here</u>
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

// export default Login;
