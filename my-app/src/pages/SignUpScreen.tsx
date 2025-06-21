import React from 'react';

export default function SignupPage() {
  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 to-blue-900">
      <div className="bg-white shadow-2xl rounded-xl flex w-full max-w-5xl overflow-hidden">
        {/* Left Section - Illustration */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <img
            src="/ambulance-illustration.png" // Replace this with your image path
            alt="Ambulance Illustration"
            className="w-full max-w-sm"
          />
        </div>

        {/* Right Section - Sign In Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Uo</h2>

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
              <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
              <span>Sign in with Google</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
