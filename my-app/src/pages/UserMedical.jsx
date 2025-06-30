import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Signin from "../images/signp.png";

export default function UserMedicalScreen() {
  const [medical, setMedical] = useState({
    bloodGroup: "",
    allergies: "",
    sugarLevel: "",
    pressure: "",
    weight: "",
    treatments: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  // Remove the useEffect with auth guard here

  const handleChange = (e) =>
    setMedical((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      await api.post(`/user/${userId}/medical`, medical, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/guardian");
    } catch (err) {
      setMsg(err.response?.data?.message || "Unable to save medical details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      {/* top gradient strip */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-l from-[#23607E] via-[#0F6B99] to-[#221160] z-0" />

      <div className="relative z-10 flex w-full max-w-5xl shadow-2xl rounded-xl overflow-hidden">
        {/* illustration */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <img src={Signin} alt="Illustration" className="w-full max-w-xl transition translate-x-[5%] translate-y-[10%]" />
        </div>

        {/* medical form */}
        <div className="w-1/2 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg p-8 w-[90%] max-w-md space-y-4"
          >
            <h2 className="text-center font-semibold text-lg">
              Medical Details
            </h2>

            {[
              { label: "Blood Group", name: "bloodGroup" },
              { label: "Allergies", name: "allergies" },
              { label: "Sugar Level", name: "sugarLevel" },
              { label: "Pressure", name: "pressure" },
              { label: "Weight", name: "weight" },
              { label: "Treatments", name: "treatments" },
            ].map(({ label, name }) => (
              <div key={name} className="flex flex-col">
                <label htmlFor={name} className="text-sm font-medium mb-1">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  value={medical[name]}
                  onChange={handleChange}
                  placeholder={`Enter ${label}`}
                  required
                  className="bg-gray-100 px-4 py-2 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-full text-white shadow-md transition ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-900 hover:opacity-90"
              }`}
            >
              {loading ? "Saving…" : "Next"}
            </button>

            {msg && <p className="text-center text-red-600 mt-2">{msg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
