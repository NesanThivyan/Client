import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}


      {/* Top Half (Plain) */}
      <div className="h-[50vh] bg-gray-200 flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-800">Our provisions</h2>
      </div>

      {/* Bottom Half (Gradient) */}
      <div className="h-[50vh] bg-gradient-to-b from-[#23607E] via-[#0F6B99] via-30% to-[#221160] py-12 flex justify-center items-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4">
          {[
            {
              icon: "🚑",
              text: "Need an Ambulance?",
            },
            {
              icon: "🏥",
              text: "Need to talk with hospital?",
            },
            {
              icon: "🧑‍⚕️",
              text: "Need a Caretaker?",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white w-60 h-72 rounded-t-xl rounded-b-full shadow-lg flex flex-col justify-between p-6 text-black"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#23607E] via-[#0F6B99] to-[#1416A7] flex items-center justify-center text-4xl">
                {card.icon}
              </div>
              <p className="text-center text-lg font-medium">{card.text}</p>
              <div className="h-4 rounded-full w-full bg-gradient-to-r from-[#0F6B99] to-[#221160] mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
