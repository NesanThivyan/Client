import React from 'react';
import Ambulance from '../images/Ambulance.png';

export default function AboutHero() {
  return (
    <section className="relative isolate min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 overflow-hidden py-16 px-4">
      {/* Faint giant word in the background */}
      <span className="absolute inset-0 flex items-center justify-center ">
        <span className="text-[20vw] font-extrabold uppercase tracking-widest text-blue-800/90 select-none pointer-events-none">
          Alert-X
        </span>
      </span>

      {/* Framed content card */}
      <div className="relative z-10 border-4 bg-white/90 backdrop-blur-5sm shadow-xl rounded-lg px-8 md:px-10 py-12 md:py-16 max-w-3xl ">
       <h2 className="text-4xl md:text-5xl font-bold text-[#0D1276] mb-9">About us</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          <span className="font-semibold">"
          Your Lifeline in Emergencies — Fast, Reliable, and Smart"</span><br />
          CareX is an emergency ambulance service app designed to save precious time. With just one tap, instantly alert nearby hospitals and ambulance centers with your live location. Whether for you or a loved one, help is always within reach.
        </p>

        <button className="mt-10 bg-[#0D1276] hover:bg-[#12A2FD] transition-colors duration-300 text-white font-semibold tracking-wide rounded-full px-8 py-3">
          Learn more
        </button>
      </div>

      {/* Ambulance hero image overlapping the card */}
      <img
        src={Ambulance}
        alt="Ambulance"
        className="absolute bottom-0 md:bottom-6 right-1/2 md:right-10 translate-x-1/2 md:translate-x-10 w-64 md:w-80 lg:w-96 drop-shadow-55xl"
      />
    </section>
  );
}
