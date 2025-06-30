import React from "react";
import { Link } from "react-router-dom"; // Assuming you use react-router-dom for navigation

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 relative overflow-hidden">
      {/* Subtle Background Gradient/Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-90" aria-hidden="true"></div>

      {/* Gradient Top Border - Enhanced */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <div className="max-w-6xl mx-auto px-5 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">CareX</h2>
          <p className="text-xs leading-relaxed max-w-sm">
            Your trusted partner in emergencies. Delivering rapid, intelligent, and reliable ambulance services.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-white transition-colors duration-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors duration-300">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors duration-300">Services</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors duration-300">Contact</Link></li>
          </ul>
        </div>

        {/* Support & Contact Info */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-xs">
            <li><Link to="/faq" className="hover:text-white transition-colors duration-300">FAQs</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
            <li>
              <p>Email: <a href="mailto:support@carex.com" className="hover:text-white transition-colors duration-300">support@carex.com</a></p>
            </li>
            <li>
              <p>Phone: <a href="tel:+12345678900" className="hover:text-white transition-colors duration-300">+1 234 567 8900</a></p>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-[0.65rem] text-gray-500 relative z-10 border-t border-gray-700 pt-4 mx-auto max-w-6xl px-5">
        &copy; {currentYear} CareX. All rights reserved.
      </div>
    </footer>
  );
}