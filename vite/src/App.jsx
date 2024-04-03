import React from "react";
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/navbar/Menu";
import About from "./components/About";
import Animals from "./components/Animals";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Quote from "./components/Quote";
import Footer from "./components/Footer";
import { MenuProvider, useMenu } from "./components/context/context";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
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
