// filepath: /home/nesanthivyan/Alertx/Client/my-app/src/components/navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png"; // Assuming you have a logo image

const Navbar = () => {
    return (
       <nav className="flex justify-between items-center px-5 py-2 bg-[#030329] text-yellow-400 fixed top-0 left-0 right-0 z-50">
            <img src={logo} alt="Logo" className="h-8" />
            <div className="space-x-6 text-sm">
                <Link to="/signup" className="hover:underline">sign up</Link>
                <Link to="/login" className="hover:underline">log in</Link>
            </div>
        </nav>
    );
};

export default Navbar;