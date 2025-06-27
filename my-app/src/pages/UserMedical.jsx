// UserMedicalScreen.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import Signin from "../images/signin1.png"; // illustration (reuse)

export default function UserMedical() {
  // local state for the medical fields
  const [medical, setMedical] = useState({
    bloodGroup: "",
    allergies: "",
    sugarLevel: "",
    pressure: "",
    weight: "",
    treatments: "",
  });

  // if you passed the basic user details from the previous screen,
  // you can grab them here (optional)
  const { state: userDetails } = useLocation();

  const navigate = useNavigate();

  /* -------- handlers -------- */
  const handleChange = (e) =>
    setMedical({ ...medical, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // you might merge basic + medical and send in one request:
    // const payload = { ...userDetails, ...medical };
    // await api.post("/userdetails", payload);

    await api.post("/user/medical", medical);

    console.table(medical); // TEMP: confirm in console

    // go to the next step
    navigate("/userguardian", { state: { ...userDetails, ...medical } });
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      {/* top gradient strip */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-l from-[#23607E] via-[#0F6B99] to-[#221160] z-0" />

      {/* card */}
      <div className="relative z-10 flex w-full max-w-5xl shadow-2xl rounded-xl overflow-hidden">
        {/* illustration */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <img src={Signin} alt="Illustration" className="w-full max-w-sm" />
        </div>

        {/* medical form */}
        <div className="w-1/2 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="relative z-10 bg-white rounded-3xl shadow-lg p-8 w-[90%] max-w-md space-y-4"
          >
            <h2 className="text-center font-semibold text-lg">
              User Medical Details
            </h2>

            {[
              { label: "Blood Group", name: "bloodGroup", type: "text" },
              { label: "Allergies", name: "allergies", type: "text" },
              { label: "Sugar Level", name: "sugarLevel", type: "text" },
              { label: "Pressure", name: "pressure", type: "text" },
              { label: "Weight", name: "weight", type: "text" },
              { label: "Treatments", name: "treatments", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name} className="flex flex-col">
                <label
                  htmlFor={name}
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={medical[name]}
                  onChange={handleChange}
                  placeholder={`Enter ${label}`}
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
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
