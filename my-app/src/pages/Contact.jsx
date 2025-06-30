import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setForm({ name: "", email: "", comment: "" });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-[#f8f9fc] overflow-hidden">
      {/* Contact Form */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 sm:p-10">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-[#180B50] mb-2">Get in Touch</h2>
          <p className="text-gray-500 text-sm">
            We'd love to hear from you. Please fill out the form below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="name">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#180B50] transition shadow-sm"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="email">
              Your Gmail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#180B50] transition shadow-sm"
              placeholder="e.g. john@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="comment">
              Your Message
            </label>
            <textarea
              name="comment"
              id="comment"
              rows="4"
              value={form.comment}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#180B50] transition shadow-sm resize-none"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#180B50] text-white text-lg font-semibold py-3 rounded-xl shadow hover:bg-[#0D1276] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
