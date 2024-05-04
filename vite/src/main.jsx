import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "typeface-inter";
import "alpinejs";
import App from "./App";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { MenuProvider } from "./components/context/context";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Hero from "./components/home/Hero";
import Animals from "./components/home/Animals";
import About from "./components/home/About";
import Contact from "./components/home/Contact";
import AdminDashboard from "./components/admin/pets/AdminDashboard";
import AddPet from "./components/admin/pets/AddPet";
import EditPet from "./components/admin/pets/EditPet";
import Navbar from "./components/home/navbar/Navbar";
import Details from "./components/admin/pets/Details";
import NotFound from "./components/other/NotFound";
import UsersDashboard from "./components/admin/users/UsersDashboard";
import Order from "./components/order/Order";
import SideBar from "./components/admin/SideBar";
import OrdersDashboard from "./components/admin/orders/OrdersDashboard";
import Confirmation from "./components/order/Confirmation";
import SendMessage from "./components/home/SendMessage";
import AddMember from "./components/admin/team/AddMember";
import TeamDashboard from "./components/admin/team/TeamDashboard";
import DetailsMember from "./components/admin/team/DetailsMember";
import AccueilHotel from "./components/hotel/AccueilHotel";
import Reservation from "./components/hotel/Reservation";
import { Toaster } from "react-hot-toast";
import ReservationDashboard from "./components/admin/reservation/ReservationDashboard";
import Userdetails from "./components/admin/users/Userdetails";
import Profile from "./components/user/Profile";
import Orders from "./components/user/Orders";
import Reservations from "./components/user/Reservations";
import { AuthProvider } from "./components/context/AuthContext";
import Dashboard from "./components/admin/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <MenuProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        {/* ------------------- HOME ROUTE ------------------- */}
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

                        <Route
                            path="/sendmessage"
                            element={
                                <>
                                    <SendMessage />
                                </>
                            }
                        />
                        {/* --------------------------------------------------- */}

                        {/* ------------------- AUTH ROUTES ------------------- */}
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

                        {/* ------------------- HOTEL ROUTES ------------------- */}
                        <Route
                            path="/hotel"
                            element={
                                <>
                                    <Navbar />
                                    <AccueilHotel />
                                </>
                            }
                        />

                        <Route
                            path="/hotel/reserve"
                            element={
                                <>
                                    <Navbar />
                                    <Reservation />
                                </>
                            }
                        />
                        {/* ---------------------------------------------------- */}

                        {/* ------------------- ADMIN ROUTES ------------------- */}
                        <Route
                            path="/dashboard"
                            element={
                                <>
                                    <SideBar />
                                    <Dashboard/>
                                </>
                            }
                        />

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
                                    <SideBar />
                                    <AddPet />
                                </>
                            }
                        />

                        <Route
                            path="/admin/edit-pet/:petId"
                            element={
                                <>
                                    <SideBar />
                                    <EditPet />
                                </>
                            }
                        />

                        <Route
                            path="/admin/details-pet/:petId"
                            element={
                                <>
                                    <SideBar />
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
                            path="/admin/user-details/:userId"
                            element={
                                <>
                                    <SideBar />
                                    <Userdetails />
                                </>
                            }
                        />

                        <Route
                            path="/admin/orders-dashboard"
                            element={
                                <>
                                    <SideBar />
                                    <OrdersDashboard />
                                </>
                            }
                        />

                        <Route
                            path="/admin/reservations-dashboard"
                            element={
                                <>
                                    <SideBar />
                                    <ReservationDashboard />
                                </>
                            }
                        />

                        <Route
                            path="/admin/team-dashboard"
                            element={
                                <>
                                    <SideBar />
                                    <TeamDashboard />
                                </>
                            }
                        />

                        <Route
                            path="/admin/add-member"
                            element={
                                <>
                                    <SideBar />
                                    <AddMember />
                                </>
                            }
                        />

                        <Route
                            path="/admin/details-member/:memberId"
                            element={
                                <>
                                    <SideBar />
                                    <DetailsMember />
                                </>
                            }
                        />
                        {/* ---------------------------------------------------- */}

                        {/* ------------------- ORDER ROUTES ------------------- */}
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
                            path="/confirmation"
                            element={
                                <>
                                    <Navbar />
                                    <Confirmation />
                                </>
                            }
                        />
                        {/* ---------------------------------------------------- */}

                        {/* ------------------- USER ROUTES ------------------- */}
                        <Route
                            path="/user/profile"
                            element={
                                <>
                                    <Navbar />
                                    <Profile />
                                </>
                            }
                        />
                        <Route
                            path="/user/orders"
                            element={
                                <>
                                    <Navbar />
                                    <Orders />
                                </>
                            }
                        />
                        <Route
                            path="/user/reservations"
                            element={
                                <>
                                    <Navbar />
                                    <Reservations />
                                </>
                            }
                        />
                        {/* ---------------------------------------------------- */}

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
            </AuthProvider>
            <Toaster position="top-center" />
        </MenuProvider>
    </React.StrictMode>
);
