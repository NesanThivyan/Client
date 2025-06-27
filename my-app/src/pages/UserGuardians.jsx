import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function UserGuardianScreen() {
  // everything passed forward from Medical
  const { state: prevData } = useLocation();
  const navigate = useNavigate();

  // local guardian fields
  const [guardian, setGuardian] = useState({
    guardianName: "",
    relationship: "",
    guardianPhone: "",
  });

  const handleChange = (e) =>
    setGuardian({ ...guardian, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullPayload = { ...prevData, ...guardian };

    // 1️⃣  send ALL data to backend
    await api.post("/guardian", fullPayload);

    // 2️⃣  (optional) clear localStorage/context, etc.

    // 3️⃣  final navigation
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-white p-8 rounded-3xl shadow-lg"
      >
        <h2 className="text-center text-lg font-semibold">Guardian Details</h2>

        {[
          { label: "Guardian Name", name: "guardianName", type: "text" },
          { label: "Relationship", name: "relationship", type: "text" },
          { label: "Phone Number", name: "guardianPhone", type: "tel" },
        ].map(({ label, name, type }) => (
          <div key={name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={guardian[name]}
              onChange={handleChange}
              required
              className="bg-gray-100 px-4 py-2 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-blue-900 text-white shadow-md hover:opacity-90"
          >
            Finish
          </button>
        </div>
      </form>
    </div>
  );
}
