import React from 'react';
import ambulanceImg from './assets/ambulance.png'; // Replace with actual image path

export default function AmbulanceBooking() {
  return (
    <div className="min-h-screen bg-[#EDEDED] flex flex-col">
      {/* Navbar */}
      <header className="bg-[#140038] text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="h-6" />
          <span className="font-bold text-lg">AlertX</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white">Link</button>
          <div className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 py-12">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img src={ambulanceImg} alt="Ambulance" className="max-h-[400px]" />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 max-w-lg bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-[#140038] mb-6">Ambulance Booking</h2>
          <form className="space-y-4 text-sm font-medium text-gray-700">
            <div>
              <label>Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 bg-[#FFF3F3] rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div>
              <label>Hospital</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 bg-[#FFF3F3] rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label>Date</label>
                <input
                  type="date"
                  className="w-full mt-1 px-4 py-2 bg-[#FFF3F3] rounded-md shadow-sm focus:outline-none"
                />
              </div>
              <div className="w-1/2">
                <label>Time</label>
                <input
                  type="time"
                  className="w-full mt-1 px-4 py-2 bg-[#FFF3F3] rounded-md shadow-sm focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label>Patient Condition / Other</label>
              <textarea
                rows="3"
                className="w-full mt-1 px-4 py-2 bg-[#FFF3F3] rounded-md shadow-sm focus:outline-none"
              ></textarea>
            </div>

            {/* Gradient Bar */}
            <div className="h-3 mt-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-700"></div>
          </form>
        </div>
      </div>
    </div>
  );
}
