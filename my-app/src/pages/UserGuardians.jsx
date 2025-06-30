import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Signin from "../images/signp.png";

export default function UserGuardianScreen() {
  const [guardian, setGuardian] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) =>
    setGuardian((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      await api.post(`/user/${userId}/guardian`, guardian, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/userscreen");
    } catch (err) {
      setMsg(err.response?.data?.message || "Unable to save guardian details");
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

        {/* form */}
        <div className="w-1/2 flex items-center justify-center bg-white">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-4 bg-white p-8 rounded-3xl shadow-lg"
          >
            <h2 className="text-center text-lg font-semibold">Guardian Details</h2>

            {[
              { label: "Guardian Name", name: "name" },
              { label: "Relationship", name: "relationship" },
              { label: "Phone Number", name: "phone", type: "tel" },
              { label: "Email", name: "email", type: "email" },
              { label: "Address", name: "address" }
            ].map(({ label, name, type = "text" }) => (
              <div key={name} className="flex flex-col">
                <label htmlFor={name} className="text-sm font-medium mb-1">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={guardian[name]}
                  onChange={handleChange}
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
              {loading ? "Saving…" : "Finish"}
            </button>

            {msg && <p className="text-center text-red-600 mt-2">{msg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
