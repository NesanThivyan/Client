import React from "react";

export default function UserDetailsForm() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* --- Split-screen background (not inside the card) --- */}
      <div className="absolute inset-0 -z-10">
        {/* Top half – gradient */}
        <div className="h-1/2 bg-gradient-to-l from-[#23607E] via-[#0F6B99] to-[#221160]" />
        {/* Bottom half – white */}
        <div className="h-1/2 bg-white" />
      </div>

      {/* --- Card --- */}
    <div className="relative w-[100%] h-[70%] max-w-2xl bg-white rounded-xl shadow-3xl overflow-hidden transform transition-x-[30%] transition-y-[30%]">

        {/* Icon row sits on the card’s top edge */}
        <div className="flex justify-center  mb-5 space-x-20">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-md border border-purple-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="purple"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.25a7.5 7.5 0 0114.998 0"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Form body */}
        <div className="p-6">
          <h2 className="text-center text-lg font-semibold mb-4">User Details</h2>

          <form className="space-y-4">
            {[
              { label: "Name", type: "text" },
              { label: "Age", type: "number" },
              { label: "Place", type: "text" },
              { label: "Phone Number", type: "tel" },
              { label: "NIC ID", type: "text" },
              { label: "Work", type: "text" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={`Enter ${field.label}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-700 text-white px-6 py-2 rounded-full shadow-md hover:opacity-90"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
