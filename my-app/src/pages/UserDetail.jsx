// src/pages/UserDetailsScreen.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../images/signp.png";
import api from "../api/axios";

export default function UserDetailsScreen() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    place: "",
    phone: "",
    nic: "",
    work: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    console.log("token:", token);
    console.log("userId:", userId);

    if (!token) {
      setMsg("Authentication token missing. Please log in again.");
      setLoading(false);
      navigate("/login");
      return;
    }

    if (!userId) {
      setMsg("User ID not found. Please log in again.");
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      await api.post(`/user/${userId}/details`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/usermedical");
    } catch (err) {
      console.error("Error saving user details:", err);
      setMsg(
        err.response?.data?.message ||
          "Unable to save details. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      {/* gradient top strip */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-l from-[#23607E] via-[#0F6B99] to-[#221160] z-0" />

      <div className="relative z-10 flex w-full max-w-5xl shadow-2xl rounded-xl overflow-hidden">
        {/* illustration */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <img src={Signin} alt="Illustration" className="w-full max-w-xl transition translate-x-[5%] translate-y-[10%]" />
        </div>

        {/* form */}
        <div className="w-1/2 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-lg p-8 w-[90%] max-w-md space-y-4">
            <h2 className="text-center text-lg font-semibold">User Details</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Name", type: "text", name: "name" },
                { label: "Age", type: "number", name: "age", min: 0 },
                { label: "Place", type: "text", name: "place" },
                { label: "Phone Number", type: "tel", name: "phone", pattern: "[0-9]{10}" },
                { label: "NIC ID", type: "text", name: "nic" },
                { label: "Work", type: "text", name: "work" },
              ].map(({ label, ...inputProps }) => (
                <div key={inputProps.name}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  <input
                    {...inputProps}
                    value={form[inputProps.name]}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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

              {msg && <p className="text-center text-red-600">{msg}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
