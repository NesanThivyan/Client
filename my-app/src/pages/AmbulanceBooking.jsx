import React from "react";
import ambulanceImg from "../images/Ambu2.png";
import bgImg from "../images/Ambulance2.jpg";

export default function AmbulanceBooking({ onClose }) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className="bg-white shadow-xl rounded-lg flex w-full max-w-4xl overflow-hidden relative z-10">
        {/* Left Section - Illustration */}
       <div className="w-1/2 bg-gray-100 flex items-center justify-center p-4">
       <img
         src={ambulanceImg}
         alt="Ambulance Illustration"
         className="w-full max-w-5xl object-contain transform translate-x-[40%] translate-y-[40%]"
        />
       </div>

        {/* Right Section - Booking Form */}
        <div className="w-1/2 p-6 flex items-center justify-center">
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl">
            <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
              Ambulance Booking
            </h2>

            <form className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Hospital"
                className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  className="w-1/2 px-3 py-1.5 border border-gray-300 rounded shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="time"
                  className="w-1/2 px-3 py-1.5 border border-gray-300 rounded shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                placeholder="Patient Condition / Other"
                rows={2}
                className="w-full px-3 py-1.5 border border-gray-300 rounded shadow-sm text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <button
                type="submit"
                className="w-full py-1.5 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:from-indigo-600 hover:to-purple-600"
              >
                Book Now
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-1.5 text-sm rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
