import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0A1D56] text-white pt-12 pb-6 relative">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4">CareX</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Your lifeline in emergencies. Fast, smart, and reliable ambulance services at your fingertips.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Services</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-300">
            support@carex.com<br />
            +1 234 567 8900<br />
            123 Emergency Lane, City
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} CareX. All rights reserved.
      </div>
    </footer>
  );
}
