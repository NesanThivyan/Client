import React, { useState } from "react";
import api from "../api/axios";
import ambulanceImg from "../images/Ambu2.png";
import bgImg from "../images/Ambulance2.jpg";

export default function AmbulanceBooking({ onClose }) {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    emergencyType: "",
    patientName: "",
    patientAge: "",
    patientCondition: "",
    contactNumber: "",
    date: "", 
    hospital: "", 
    bookingName: "",
  });

  // Handle change for all form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "patientAge" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const dataToSend = {
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      emergencyType: formData.emergencyType,
      patientName: formData.patientName,
      patientAge: formData.patientAge,
      patientCondition: formData.patientCondition,
      contactNumber: formData.contactNumber,
      date: formData.date, 
      hospital: formData.hospital,
      name: formData.bookingName,
    };

    try {
      // You can log the data being sent to verify
      console.log("Sending booking data:", dataToSend);
      await api.post("/bookings", dataToSend);
      alert("Booking successful!");
      onClose();
    } catch (error) {
      console.error("Booking Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to book. Please try again.");
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
              name="pickupLocation"
              placeholder="Pickup Location"
              value={formData.pickupLocation}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="dropoffLocation"
              placeholder="Dropoff Location"
              value={formData.dropoffLocation}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="emergencyType"
              placeholder="Emergency Type"
              value={formData.emergencyType}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="number"
              name="patientAge"
              placeholder="Patient Age"
              value={formData.patientAge}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
              required
              min={0}
            />

            <input
              type="text"
              name="patientCondition"
              placeholder="Patient Condition"
              value={formData.patientCondition}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
              required
            />

          
            <input
              type="date" 
              name="date"
              placeholder="Booking Date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
              required 
            />

            <input
              type="text"
              name="hospital"
              placeholder="Target Hospital"
              value={formData.hospital}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="bookingName" 
              placeholder="Requester Name / Booking Name"
              value={formData.bookingName}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
            {/* ------------------------- */}

            <button
              type="submit"
              className="w-full py-1.5 text-sm rounded bg-blue-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-600"
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