import React, { useState } from "react";
import api from "../api/axios";            
import ambulanceImg from "../images/Ambu2.png";
import bgImg from "../images/Ambulance2.jpg";

export default function AmbulanceBooking({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    hospital: "",
    date: "",
    time: "",
    condition: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // combine date + time into one Date object
      const { date, time, ...rest } = formData;
      const bookingDate = new Date(`${date}T${time}:00`);

      // POST through our configured api instance
      await api.post("/bookings", { ...rest, date: bookingDate });

      alert("Booking successful!");
      onClose();
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Failed to book. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="bg-white shadow-xl rounded-lg flex w-full max-w-4xl overflow-hidden relative z-10">
        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-4">
          <img
            src={ambulanceImg}
            alt="Ambulance Illustration"
            className="w-full max-w-5xl object-contain transform translate-x-[40%] translate-y-[40%]"
          />
        </div>

        <div className="w-1/2 p-6 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl space-y-3"
          >
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
              Ambulance Booking
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="hospital"
              placeholder="Hospital"
              value={formData.hospital}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-2">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-1/2 px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-1/2 px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <textarea
              name="condition"
              placeholder="Patient Condition / Other"
              rows={2}
              value={formData.condition}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded shadow-sm text-sm resize-none focus:ring-2 focus:ring-blue-500"
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
  );
}
