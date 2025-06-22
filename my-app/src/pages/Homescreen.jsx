import React from 'react';
import Cover from '../images/cover1.png'
import Logo from '../images/logo.png';
import AboutUsSection from './Aboutusscreen';
import ServiceScreen from './ServiceScreen'; // Import ServiceScreen
import Contact from './Contact';
import Feedback from './feedback'; // Import Feedback component

const HeroSection = () => {
  return (
    <>
      <section className="relative min-h-screen text-white flex items-center justify-center p-12 bg-[linear-gradient(to_left,_#23607E,_#0F6B99,_#0F6B99,_#0F6B99,_#1416A7,_#221160)]">
        {/* Hero content */}
        <div className="grid md:grid-cols-2 gap-8 items-center w- max-w-6xl">
          {/* Lef
t side: Text and logo */}
          <div>
            <img src={Logo} alt="Logo" className="h-35 w-45 left-0 " />
            <p className="text-xl">Instant help at your fingertips</p>
          </div>
          {/* Right side: Doctors/Nurses image */}
          <div className="flex justify-center">
            <img src={Cover} alt="Logo" className="w-[950px] h-[500px]  top-800 right-0 transform translate-x-[15%] translate-y-[15%]" />
          </div>
        </div>
      </section>
      {/* Add About and Service sections below the hero */}
      <AboutUsSection />
      <ServiceScreen />
      <Contact />
      <Feedback />
    </>
  );
};

export default HeroSection;