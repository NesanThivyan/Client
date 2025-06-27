import React from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../images/logo.png";
import Ambulance from "../images/Ambuolan.jpeg";
import CareTaker from "../images/Care.jpeg";
import Hospital from "../images/chat.jpeg";

export default function ServiceScreen() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "24/7 Ambulance",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: Ambulance,
    },
    {
      title: "Care Takers",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: CareTaker,
    },
    {
      title: "Talk with Hospital",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: Hospital,
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center py-16 bg-white">
      {/* ─── Section heading ─────────────────────────────── */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-12">
        3 Reasons To Choose Us
      </h2>

      {/* ─── Card row ────────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-10 px-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="relative max-w-sm w-full p-8 bg-white rounded-[28px]
                       shadow-[0_15px_25px_-5px_rgba(0,0,0,0.05)]
                       before:content-[''] before:absolute before:-top-2 before:-left-2
                       before:w-[60%] before:h-[60%] before:border-t-[3px] before:border-l-[3px]
                       before:border-[#0F6B99] before:rounded-tl-[28px]
                       after:content-[''] after:absolute after:-bottom-2 after:-right-2
                       after:w-[60%] after:h-[60%] after:border-b-[3px] after:border-r-[3px]
                       after:border-[#0F6B99] after:rounded-br-[28px]"
          >
            <h3 className="text-lg font-semibold text-center text-gray-900 mb-4">
              {card.title}
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed text-center">
              {card.desc}
            </p>

            <img
              src={card.img}
              alt={card.title}
              className="w-full h-40 object-cover rounded-[18px] mt-6"
            />
          </div>
        ))}
      </div>

      {/* ─── CTA button ──────────────────────────────────── */}
      <button
        onClick={() => navigate("/userscreen")}
        className="mt-12 bg-[#0F6B99] text-white px-8 py-3 rounded-full shadow-lg
                   hover:bg-[#23607E] transition font-semibold"
      >
        Explore More
      </button>
    </section>
  );
}
