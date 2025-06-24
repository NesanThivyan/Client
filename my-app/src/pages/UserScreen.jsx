import React, { useState } from "react";
import Ambulance2 from "../images/Ambulance2.jpg";
import AmbulanceBooking from "./AmbulanceBooking";
import Caretaker from "./Caretaker";

export default function ServiceScreen() {
  const [showBooking, setShowBooking] = useState(false);
  const [showCaretaker, setShowCaretaker] = useState(false); // Added this line

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Half (Fixed Background Image) */}
      <div
        className="h-[50vh] bg-cover bg-center bg-fixed flex items-center justify-center"
        style={{
          backgroundImage: `url(${Ambulance2})`,
        }}
      >
        <h2 className="text-xl font-semibold text-white bg-black bg-opacity-40 px-4 py-2 rounded">
          Our Provisions
        </h2>
      </div>

      {/* Bottom Half (White Background with Cards) */}
      <div className="h-[50vh] bg-white py-12 flex flex-col items-center">
        <div className="flex flex-row justify-center items-center gap-10 px-4">
          {/* Ambulance Card */}
          <div className="bg-white w-60 h-80 rounded-t-xl rounded-b-full shadow-lg flex flex-col justify-between p-6 text-black">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#23607E] via-[#0F6B99] to-[#1416A7] flex items-center justify-center text-4xl">
              🚑
            </div>
            <p className="text-center text-lg font-medium">Need an Ambulance?</p>
            <button
              className="mt-4 bg-[#23607E] text-white py-2 px-2 rounded-full hover:bg-[#1a4c65] transition"
              onClick={() => {
                setShowBooking(true);
                setShowCaretaker(false);
              }}
            >
              Book Now
            </button>
          </div>

          {/* Hospital Contact Card */}
          <div className="bg-white w-60 h-80 rounded-t-xl rounded-b-full shadow-lg flex flex-col justify-between p-6 text-black">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#23607E] via-[#0F6B99] to-[#1416A7] flex items-center justify-center text-4xl">
              🏥
            </div>
            <p className="text-center text-lg font-medium">Need to talk with hospital?</p>
            <button className="mt-4 bg-[#23607E] text-white py-2 px-2 rounded-full hover:bg-[#1a4c65] transition">
              Contact
            </button>
          </div>

          {/* Caretaker Card */}
          <div className="bg-white w-60 h-80 rounded-t-xl rounded-b-full shadow-lg flex flex-col justify-between p-6 text-black">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#23607E] via-[#0F6B99] to-[#1416A7] flex items-center justify-center text-4xl">
              🧑‍⚕️
            </div>
            <p className="text-center text-lg font-medium">Need a Caretaker?</p>
            <button
              className="mt-4 bg-[#23607E] text-white py-2 px-2 rounded-full hover:bg-[#1a4c65] transition"
              onClick={() => {
                setShowCaretaker(true);
                setShowBooking(false);
              }}
            >
              Find One
            </button>
          </div>
        </div>

        {/* Conditional Renderings */}
        {showBooking && (
          <div className="w-full mt-8">
            <AmbulanceBooking onClose={() => setShowBooking(false)} />
          </div>
        )}
        {showCaretaker && (
          <div className="w-full mt-8">
            <Caretaker onClose={() => setShowCaretaker(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
