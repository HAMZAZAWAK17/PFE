import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { MenuProvider } from "./components/context/context";
import Register from "./components/Register";
import Login from "./components/Login";
import axios from "axios";
import Hero from "./components/Hero";
import Animals from "./components/Animals";
import About from "./components/About";
import Contact from "./components/Contact";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddPet from "./components/admin/AddPet";
import EditPet from "./components/admin/EditPet";
import Navbar from "./components/navbar/Navbar";
import NavAdmin from "./components/admin/NavAdmin";
import Details from "./components/admin/Details";
import NotFound from "./NotFound";
import UsersDashboard from "./components/admin/UsersDashboard";
import OrdersDashboard from "./components/admin/OrdersDashboard";

axios.defaults.xsrfCookieName = "XSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <App />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <Register />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />
          {/* Routes without Navbar */}
          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <Hero />
              </>
            }
          />
          <Route
            path="/pets"
            element={
              <>
                <Navbar />
                <Animals />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
              </>
            }
          />
          {/* ------------------- ADMIN ------------------- */}
          <Route
            path="/admin-dashboard"
            element={
              <>
                <NavAdmin />
                <AdminDashboard />
              </>
            }
          />
          <Route
            path="/admin/add-pet"
            element={
              <>
                <NavAdmin />
                <AddPet />
              </>
            }
          />
          <Route
            path="/admin/edit-pet/:petId"
            element={
              <>
                <NavAdmin />
                <EditPet />
              </>
            }
          />
          <Route
            path="/admin/details-pet/:petId"
            element={
              <>
                <NavAdmin />
                <Details />
              </>
            }
          />

          <Route
            path="/admin/users-dashboard"
            element={
              <>
                <NavAdmin />
                <UsersDashboard />
              </>
            }
          />

          <Route
            path="/admin/orders-dashboard"
            element={
              <>
                <NavAdmin />
                <OrdersDashboard />
              </>
            }
          />

          {/* ------------------------------------------ */}

          <Route
            path="/*"
            element={
              <>
                <NotFound />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  </React.StrictMode>
);
