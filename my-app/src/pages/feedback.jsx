import React, { useState } from "react";

const feedbacks = [
  {
    name: "John Doe",
    comment: "Great service! The ambulance arrived quickly and the staff was very professional.",
  },
  {
    name: "Priya Sharma",
    comment: "Easy to use app and very helpful in emergencies. Highly recommended!",
  },
  {
    name: "Ahmed Ali",
    comment: "Caretaker service was excellent. Thank you for your support.",
  },
];

export default function Feedback() {
  const [index, setIndex] = useState(0);

  const prevFeedback = () => {
    setIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
  };

  const nextFeedback = () => {
    setIndex((prev) => (prev === feedbacks.length - 1 ? 0 : prev + 1));
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
  <div
    className="relative bg-white rounded-xl p-8 w-full max-w-3xl  max-h-3xl flex flex-col items-center h-[400px]"
    style={{
      boxShadow: "0 8px 32px 0 rgba(24, 11, 80, 0.5)" // #180B50 with 50% opacity
    }}
  >
    <h2 className="text-2xl font-bold text-[#180B50] mb-6">User Feedback</h2>
    <div className="flex items-center w-full">"
          {/* Left Arrow */}
          <button
            onClick={prevFeedback}
            className="text-3xl text-gray-400 hover:text-[#180B50] transition px-2"
            aria-label="Previous feedback"
          >
            &#8592;
          </button>
          {/* Feedback Content */}
          <div className="flex-1 px-4">
            <p className="text-lg text-gray-700 text-center mb-2">
              "{feedbacks[index].comment}"
            </p>
            <p className="text-right text-sm text-[#180B50] font-semibold">
              - {feedbacks[index].name}
            </p>
          </div>
          {/* Right Arrow */}
          <button
            onClick={nextFeedback}
            className="text-3xl text-gray-400 hover:text-[#180B50] transition px-2"
            aria-label="Next feedback"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}