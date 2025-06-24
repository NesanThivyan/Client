import React from "react";
import Caretakers from "../images/care.png";
import bgImg from "../images/Ambulance2.jpg";

export default function AmbulanceBooking({ onClose }) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className="bg-white shadow-xl rounded-lg flex w-full max-w-4xl overflow-hidden relative z-10 translate-y-[2%]">
        {/* Left Section - Illustration */}
       <div className="w-1/2 bg-gray-100 flex items-center justify-center p-4">
       <img
         src={Caretakers}
         alt="Ambulance Illustration"
         className="w-full max-w-5xl object-contain transform translate-x-[30%] translate-y-[30%]"
        />
       </div>

        {/* Right Section - Booking Form */}
        <div className="w-1/2 p-6 flex items-center justify-center">
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl">
             <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-[#140038] mb-6">
            Caretakers Services
          </h2>
          <ul className="space-y-3 text-gray-700 text-[15px] font-medium">
            <li>1) Personal care</li>
            <li>2) Mobility</li>
            <li>3) Monitoring vital signs</li>
            <li>4) Environmental support</li>
            <li>5) Assisting with meals</li>
            <li>6) Physiotherapy</li>
          </ul>

          {/* Gradient Progress Bar */}
          <div className="w-full h-3 rounded-full mt-6 bg-gradient-to-r from-blue-500 to-purple-700"></div>

          {/* Book Now Button */}
          <div className="mt-6 text-center">
            <button className="px-6 py-2 bg-[#CDB4FF] text-white font-semibold rounded-md hover:bg-[#bca3f2] transition">
              Book Now
            </button>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
