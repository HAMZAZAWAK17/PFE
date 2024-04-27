import React, { useEffect } from "react";
import Navbar from "./components/home/navbar/Navbar";
import About from "./components/home/About";
import Animals from "./components/home/Animals";
import Contact from "./components/home/Contact";
import Hero from "./components/home/Hero";
import Quote from "./components/home/Quote";
import Footer from "./components/home/Footer";

function App() {
    useEffect(() => {
        localStorage.removeItem("CurrentPath");
    });
    return (
        <div className="App relative">
            <section id="hero" className="snap-center">
                <Hero />
            </section>
            <section className="mt-56 h-full snap-center">
                <Quote />
            </section>
            <section id="pets" className="snap-center">
                <Animals />
            </section>
            <section id="about" className="snap-center">
                <About />
            </section>
            <section id="contact" className="snap-center">
                <Contact />
            </section>
            <section className="snap-center">
                <Footer />
            </section>
        </div>
    );
}

export default App;
