import React from "react";
import HeroBg from "../images/D.png"; 
import Logo   from "../images/logo.png";

import AboutUsSection  from "./Aboutusscreen";
import ServiceScreen   from "./ServiceScreen";
import Contact         from "./Contact";
import Feedback        from "./feedback";
import Profile         from "./Profile";
import Footer from "../components/footer";
const Homescreen = () => {
  return (
    <>
      {/* ────── Hero ────── */}
      <section
        className="relative min-h-screen bg-cover bg-center text-white flex items-center p-12"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        {/* Optional dark overlay for contrast */}

        <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
          {/* left: logo + headline */}
          <div>
            <img src={Logo} alt="Logo" className="h-30 mb-6" />
            <p className="text-4xl font-bold leading-tight">
              Instant help at your fingertips
            </p>
          </div>

          {/* right: add something later if you like */}
          <div />
        </div>
      </section>

      {/* ────── rest of the page ────── */}
      <AboutUsSection />
      <ServiceScreen />
      <Contact />
      <Feedback />
      <Footer />

    </>
  );
};

export default Homescreen;
