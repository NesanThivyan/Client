import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";          // ✅ named import
import Signin from "../images/signin1.png";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default function UserDetailsScreen() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    place: "",
    phone: "",
    nic: "",
    work: "",
  });

  const navigate = useNavigate();

  // ✨ Extract userId from JWT
  const token = localStorage.getItem("token");
  let userId = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);          // ✅ correct call
      userId = decoded.id || decoded._id;        // adjust to your payload
    } catch (e) {
      console.error("Invalid token:", e);
    }
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not authenticated. Please login.");
      return;
    }

    try {
      // Adjust the endpoint to match your backend route, e.g., `/users/${userId}` or `/userdetails/${userId}`
      await api.post(`/users/${userId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/usermedical", { state: form });
    } catch (error) {
      console.error("Failed to submit user details:", error);
      alert(
        error.response?.data?.message ||
          "Error submitting details. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-l from-[#23607E] via-[#0F6B99] to-[#221160] z-0" />

      <div className="relative z-10 flex w-full max-w-5xl shadow-2xl rounded-xl overflow-hidden">
        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <img src={Signin} alt="Illustration" className="w-full max-w-sm" />
        </div>

        <div className="w-1/2 flex items-center justify-center p-4">
          <div className="relative z-10 bg-white rounded-3xl shadow-lg p-8 w-[90%] max-w-md space-y-4">
            <h2 className="text-center text-lg font-semibold mb-4">User Details</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Name", type: "text", name: "name" },
                { label: "Age", type: "number", name: "age" },
                { label: "Place", type: "text", name: "place" },
                { label: "Phone Number", type: "tel", name: "phone" },
                { label: "NIC ID", type: "text", name: "nic" },
                { label: "Work", type: "text", name: "work" },
              ].map(({ label, type, name }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={`Enter ${label}`}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="bg-blue-900 text-white px-6 py-2 rounded-full shadow-md hover:opacity-90"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
