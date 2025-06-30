// src/pages/LoginScreen.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../images/signp.png";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  /** -------*  Auto‑redirect if already logged in *------ */
  useEffect(() => {
    if (auth.token) {
      navigate(auth.role === "admin" ? "/admin/dashboard" : "/userscreen", { replace: true });
    }
  }, [auth, navigate]);

  /** ------  Handle form submit------------ */
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await api.post("/auth/signin", { email, password }); 
      const { token, user } = data;

      /* Save auth to localStorage */
      localStorage.setItem("token", token);
      localStorage.setItem("role",  user.role);
      localStorage.setItem("userId", user.id || user._id);

      /* Save to context */
      setAuth({ token, role: user.role });

      setMessage("Login successful!");

      /* Redirect based on role */
      navigate(user.role === "admin" ? "/admin/dashboard" : "/userscreen", { replace: true });
    } catch (err) {
      const errMsg = err.response?.data?.message || "Login failed. Please try again.";
      setMessage(errMsg);
    }
  };

  /* -------  JSX -------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-l from-[#23607E] via-[#0F6B99] to-[#221160] z-0" />
      <div className="bg-white shadow-2xl rounded-xl flex w-full max-w-5xl overflow-hidden relative z-10">
        {/* illustration */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <img src={Signin} alt="Signin Illustration" className="w-full max-w-xl transition translate-x-[5%] translate-y-[10%]"  />
        </div>

        {/* form */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded border shadow-md focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded border shadow-md focus:ring-2 focus:ring-blue-400"
            />

            <div className="text-right text-sm text-blue-500 cursor-pointer hover:underline">
              Forgot Password?
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded shadow hover:bg-blue-800 transition"
            >
              Sign In
            </button>

            {message && (
              <div
                className={`text-center font-semibold mt-4 ${
                  message === "Login successful!" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            {/* Social login placeholder */}
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
