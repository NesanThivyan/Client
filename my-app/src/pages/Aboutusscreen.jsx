import React from 'react';
import Ambulance from '../images/Ambulance.png';

const AboutUsSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center py-10">
      <div className="w-full max-w-6xl mx-auto rounded-lg shadow-lg overflow-hidden bg-white">
        {/* About Section */}
        <div className="relative bg-gradient-to-r from-[#180B50] via-[#12A2FD] to-[#0D1276] p-8 md:p-12 -mt-48 z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Left: Text Content */}
          <div className="md:w-1/2 text-white text-center md:text-left transform translate-x-[-40%] translate-y-[110%]">
            <h2 className="text-4xl font-bold mb-4">About us</h2>
            <p className="text-lg leading-relaxed">
              <span className="font-semibold">"Your Lifeline in Emergencies — Fast, Reliable, and Smart"</span><br />
              CareX is an emergency ambulance service app designed to save precious time. With just one tap, instantly alert nearby hospitals and ambulance centers with your live location. Whether for you or a loved one, help is always within reach.
            </p>
          </div>
          {/* Right: Image */}
          <div className="md:w-1/2 flex justify-center items-center transform translate-x-[58%] translate-y-[-10%]">
            <img 
              src={Ambulance}
              alt="Ambulance" 
              className="w-full max-w-xs md:max-w-sm h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;