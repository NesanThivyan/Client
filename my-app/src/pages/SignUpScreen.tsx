import React, { useState } from "react";
import Signin from "../images/signin1.png";
import api from "../api/axios";
export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const res = await api.post("/auth/signup", {
        name: username,
        email,
        password,
      });

      setMessage("Signup successful!");
      console.log("Signup response:", res.data);
      // Optional: Redirect to login or homepage
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Signup failed. Try again.";
      setMessage(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      {/* Top Half Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-l from-[#23607E] via-[#0F6B99] to-[#221160] z-0" />

      {/* Main Content */}
      <div className="bg-white shadow-2xl rounded-xl flex w-full max-w-5xl overflow-hidden relative z-10">
        {/* Left Section - Illustration */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <img
            src={Signin}
            alt="Ambulance Illustration"
            className="w-full max-w-sm"
          />
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Gmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded shadow hover:bg-blue-800 transition"
            >
              Sign Up
            </button>

            {message && (
              <div className="text-center text-red-600 font-semibold mt-4">
                {message}
              </div>
            )}

            <div className="flex items-center justify-center gap-2 mt-4 border rounded py-2 hover:bg-gray-100 cursor-pointer transition">
              <img
                src="https://img.icons8.com/color/24/000000/google-logo.png"
                alt="Google"
              />
              <span>Sign up with Google</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}