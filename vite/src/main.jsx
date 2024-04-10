//main.jsx

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
import Order from "./components/Order";
import SideBar from "./components/admin/SideBar";
import OrdersDashboard from "./components/admin/orders/OrdersDashboard";
import Confirmation from "./components/Confirmation";
import SendMessage from "./components/SendMessage";
import TeamDashboard from "./components/admin/Team/TeamDashboard";
import AddMember from "./components/admin/Team/AddMember";

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
                        path="/signup"
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
                        path="/order/:id"
                        element={
                            <>
                                <Navbar />
                                <Order />
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

                    <Route
                        path="/sendmessage"
                        element={
                            <>
                                <SendMessage />
                            </>
                        }
                    />
                    {/* ------------------- ADMIN ------------------- */}
                    <Route
                        path="/admin-dashboard"
                        element={
                            <>
                                <SideBar />
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
                                <SideBar />
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

                    <Route
                        path="/admin/team-dashboard"
                        element={
                            <>
                                <NavAdmin />
                                <TeamDashboard />
                            </>
                        }
                    />

                    <Route
                        path="/admin/add-member"
                        element={
                            <>
                                <NavAdmin />
                                <AddMember />
                            </>
                        }
                    />

                    <Route
                        path="/confirmation"
                        element={
                            <>
                                <Confirmation />
                            </>
                        }
                    />

                    <Route path="/SideBar" element={<SideBar />} />

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
