import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-5 py-2 bg-[#030329] text-white fixed top-0 left-0 right-0 z-50">
      {/* Logo (Clickable to Home) */}
      <img
        src={logo}
        alt="Logo"
        className="h-8 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Navigation Buttons */}
      <div className="space-x-6 text-sm">
        <button className="hover:underline" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="hover:underline" onClick={() => navigate("/signup")}>
          Sign up
        </button>
        <button className="hover:underline" onClick={() => navigate("/login")}>
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
