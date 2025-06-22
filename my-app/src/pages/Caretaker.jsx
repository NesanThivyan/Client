// CaretakerServices.jsx
import React from 'react';
import { Button } from '@/components/ui/button'; // Optional if you're using a UI library
import elderlyImage from './assets/elderly.png'; // Replace with your image path

export default function CaretakerServices() {
  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col">
      {/* Navbar */}
      <header className="bg-[#140038] text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="h-6" /> {/* Replace with your logo */}
          <span className="font-bold text-lg">AlertX</span>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-white">Link</button>
          <div className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        {/* Left Image */}
        <div className="w-1/2 hidden md:flex justify-center">
          <img src={elderlyImage} alt="Elderly and caretaker" className="max-h-[400px]" />
        </div>

        {/* Services Card */}
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
              📅 Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
