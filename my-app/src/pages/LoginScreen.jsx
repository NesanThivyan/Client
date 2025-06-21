// File: LoginPage.jsx
import React from "react";
import Signin from "../images/signin1.png"; // Import your illustration image

export default function LoginPage() {
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

    {/* Right Section - Sign In Form */}
    <div className="w-1/2 p-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

      <form className="space-y-5">
        <div>
          <input
            type="text"
            placeholder="Role"
            className="w-full px-4 py-3 rounded shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 rounded shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="text-right text-sm text-blue-500 cursor-pointer hover:underline">
          Forgot Password?
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded shadow hover:bg-blue-800 transition"
        >
          Sign In
        </button>

        <div className="flex items-center justify-center gap-2 mt-4 border rounded py-2 hover:bg-gray-100 cursor-pointer transition">
          <img
            src="https://img.icons8.com/color/24/000000/google-logo.png"
            alt="Google"
          />
          <span>Sign in with Google</span>
        </div>
      </form>
    </div>
  </div>
</div>

  );
}
