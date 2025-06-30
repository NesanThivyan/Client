import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../images/signp.png";
import api from "../api/axios";

interface FormState {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpScreen() {
  const [form, setForm] = useState<FormState>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      setLoading(true);

      /* ---------- 1. send signup request ---------- */
      const { data } = await api.post("/auth/signup", {
        name:     form.username,  
        email:    form.email,
        password: form.password,
        role:     "user",
      });

      console.log("%c[Signup] full response:", "color:#0a0", data);

      /* ---------- 2. normalize possible keys ---------- */
      const token   = data.token        ?? data.accessToken ?? data.data?.token;
      const userObj = data.user         ?? data.data?.user  ?? null;
      const userId  = userObj?._id      ?? userObj?.id      ?? null;

      /* ---------- 3. handle all scenarios ---------- */
      if (token && userId) {
        /* Success: store & move on ------------------- */
        localStorage.setItem("token",  token);
        localStorage.setItem("userId", userId);
        return navigate("/userdetails");
      }

      /* Partial success (e.g. email‑verify flow) ----- */
      setMessage(
        data.message ??
        "Account created. Please verify your email or log in."
      );
      return navigate("/login");
    } catch (err: any) {
      console.error("[Signup error]", err);
      console.error("[Backend payload]", err.response?.data);

      setMessage(
        err.response?.data?.message ??
        err.message ??
        "Signup failed — please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ------- JSX ------- */

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      {/* gradient banner */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-l from-[#23607E] via-[#0F6B99] to-[#221160] z-0" />

      <div className="bg-white rounded-xl shadow-2xl flex w-full max-w-5xl overflow-hidden relative z-10">
        {/* illustration */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <img src={Signin} alt="Sign up" className="w-full max-w-xl transition translate-x-[5%] translate-y-[10%]" />
        </div>

        {/* form */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

          <form onSubmit={handleSignup} className="space-y-5">
            <input
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
              className="w-full px-4 py-3 rounded border shadow-md focus:ring-2 focus:ring-blue-400"
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="username"
              placeholder="Username"
              autoComplete="username"
              required
              className="w-full px-4 py-3 rounded border shadow-md focus:ring-2 focus:ring-blue-400"
              value={form.username}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              required
              className="w-full px-4 py-3 rounded border shadow-md focus:ring-2 focus:ring-blue-400"
              value={form.password}
              onChange={handleChange}
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              required
              className="w-full px-4 py-3 rounded border shadow-md focus:ring-2 focus:ring-blue-400"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded text-white shadow transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {loading ? "Creating account…" : "Sign Up"}
            </button>

            {!!message && (
              <p className="mt-4 text-center font-medium text-red-600">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
