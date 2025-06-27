import React, { useState } from "react";
import Ambulance2 from "../images/Ambulance2.jpg";
import AmbulanceBooking from "./AmbulanceBooking";
import Caretaker from "./Caretaker";
import ChatBox from "./chatbox";        // ← ① Component names start with a capital

export default function ServiceScreen() {
  // ② keep the same casing everywhere
  const [showBooking, setShowBooking] = useState(false);
  const [showCaretaker, setShowCaretaker] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Half (Fixed Background Image) */}
      <div
        className="h-[50vh] bg-cover bg-center bg-fixed flex items-center justify-center"
        style={{ backgroundImage: `url(${Ambulance2})` }}
      >
        <h2 className="text-xl font-semibold text-white bg-black bg-opacity-40 px-4 py-2 rounded">
          Our Provisions
        </h2>
      </div>

      {/* Bottom Half */}
      <div className="h-[50vh] bg-white py-12 flex flex-col items-center">
        <div className="flex flex-row justify-center items-center gap-10 px-4">
          {/* Ambulance Card */}
          <ServiceCard
            emoji="🚑"
            label="Need an Ambulance?"
            buttonText="Book Now"
            onClick={() => {
              setShowBooking(true);
              setShowCaretaker(false);
              setShowChatBox(false);
            }}
          />

          {/* Hospital Contact Card */}
          <ServiceCard
            emoji="🏥"
            label="Need to talk with hospital?"
            buttonText="Contact"
            onClick={() => {
              setShowChatBox(true);
              setShowBooking(false);
              setShowCaretaker(false);
            }}
          />

          {/* Caretaker Card */}
          <ServiceCard
            emoji="🧑‍⚕️"
            label="Need a Caretaker?"
            buttonText="Find One"
            onClick={() => {
              setShowCaretaker(true);
              setShowBooking(false);
              setShowChatBox(false);
            }}
          />
        </div>

        {/* Conditional render */}
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

        {showChatBox && (
          <div className="w-full mt-8">
            <ChatBox onClose={() => setShowChatBox(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

/* Tiny helper to avoid repeating card markup */
function ServiceCard({ emoji, label, buttonText, onClick }) {
  return (
    <div className="bg-white w-60 h-80 rounded-t-xl rounded-b-full shadow-lg flex flex-col justify-between p-6 text-black">
      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#23607E] via-[#0F6B99] to-[#1416A7] flex items-center justify-center text-4xl">
        {emoji}
      </div>
      <p className="text-center text-lg font-medium">{label}</p>
      <button
        onClick={onClick}
        className="mt-4 bg-[#23607E] text-white py-2 px-2 rounded-full hover:bg-[#1a4c65] transition"
      >
        {buttonText}
      </button>
    </div>
  );
}
