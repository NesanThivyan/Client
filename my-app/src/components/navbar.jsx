import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import logo from "../images/logo.png";
import defaultProfilePic from "../images/profiles.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  /* ----- helpers ----- */
  const handleLogout = () => {
    setAuth({ token: null, role: null });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Give each role its own landing page
  const getDashboardPath = () => {
    switch (auth?.role) {
      case "admin":
        return "/admin/dashboard";
      case "user":
        return "/userscreen";
      default:
        return "/";
    }
  };

  return (
    <nav className="flex justify-between items-center px-5 py-2 bg-[#030329] text-white fixed top-0 left-0 right-0 z-50">
      {/* ---- Logo ---- */}
      <img
        src={logo}
        alt="Logo"
        className="h-8 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* ---- Right‑side controls ---- */}
      <div className="flex items-center space-x-6 text-sm">
        {/* Home is always there */}
        <button className="hover:underline" onClick={() => navigate("/")}>
          Home
        </button>

        {/* Dashboard shows only when signed‑in */}
        {auth?.token && (
          <button
            className="hover:underline"
            onClick={() => navigate(getDashboardPath())}
          >
            {auth.role === "admin" ? "Admin dashboard" : "My dashboard"}
          </button>
        )}

        {/* Auth actions */}
        {!auth?.token ? (
          <>
            <button className="hover:underline" onClick={() => navigate("/signup")}>
              Sign up
            </button>
            <button className="hover:underline" onClick={() => navigate("/login")}>
              Sign in
            </button>
          </>
        ) : (
          <>
            <button className="hover:underline" onClick={handleLogout}>
              Sign out
            </button>
            <img
              src={defaultProfilePic}
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer object-cover"
              onClick={() => navigate("/profile")}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
