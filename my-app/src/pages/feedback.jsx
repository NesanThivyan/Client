import React from "react";
import pro1 from "../images/profile2.jpeg"; 
import pro2 from "../images/profile3.jpeg";
import pro3 from "../images/profiles.png";
function TestimonialCard({ name, title, comment, avatar, stars }) {
  return (
    <div className="relative flex items-start w-[350px] bg-white rounded-2xl shadow-lg p-4 overflow-visible">
      {/* Blue bar — straight, positioned top-left, shifted outside slightly */}
      <div
        className="
          absolute -top-4 -left-4      
          w-[220px] h-[70px]         
          bg-indigo-800
          rounded-tl-3xl rounded-br-3xl rounded-tr-lg
          z-0
        "
      />

      <div className="relative z-10 flex flex-col pl-6 pt-4 w-[230px]">
        <span className="text-white font-semibold text-base">{name}</span>
        <span className="text-indigo-100 text-sm">{title}</span>

        <div className="flex items-center mt-2 space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${i < stars ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </span>
          ))}
        </div>

        <p className="text-gray-700 text-xs mt-2">{comment}</p>
      </div>

      <img
        src={pro1 || pro2 || pro3}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md absolute top-2 right-2 z-20"
      />
    </div>
  );
}

export default function ThreeFeedbackCards() {
  const feedbacks = [
    {
      name: "John Doe",
      title: "Paramedic",
      comment:
        "Great service! The ambulance arrived quickly and the staff was very professional.",
      img: { pro1 },
      stars: 5,
    },
    {
      name: "Priya Sharma",
      title: "Doctor",
      comment:
        "Easy to use app and very helpful in emergencies. Highly recommended!",
      img: { pro3 },
      stars: 5,
    },
    {
      name: "Ahmed Ali",
      title: "Caretaker",
      comment:
        "Caretaker service was excellent. Thank you for your support.",
      img: { pro2 },
      stars: 4,
    },
  ];

  return (
    <section className="min-h-[500px] flex flex-col items-center justify-center bg-gradient-to-br from-[#E0E7FF] to-[#F0F4FF] px-4 py-16">
      <h2 className="text-3xl font-bold text-[#180B50] mb-10">User Feedback</h2>

      <div className="relative flex justify-center items-center gap-8">
        {/* Left card – slightly behind & lower */}
        <div className="relative z-0 -translate-y-4 translate-x-3">
          <TestimonialCard {...feedbacks[0]} />
        </div>

        {/* Center card – highest */}
        <div className="relative z-10">
          <TestimonialCard {...feedbacks[1]} />
        </div>

        {/* Right card – slightly behind & lower */}
        <div className="relative z-0 -translate-y-4 -translate-x-3">
          <TestimonialCard {...feedbacks[2]} />
        </div>
      </div>
    </section>
  );
}
