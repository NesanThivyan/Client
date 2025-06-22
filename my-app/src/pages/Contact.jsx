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
    // Handle form submission logic here
    alert("Message sent!");
    setForm({ name: "", email: "", comment: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center mb-2 text-[#180B50]">Contact Us</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="px-4 py-3 rounded border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Gmail"
          value={form.email}
          onChange={handleChange}
          required
          className="px-4 py-3 rounded border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="comment"
          placeholder="Your Comment"
          value={form.comment}
          onChange={handleChange}
          required
          rows={4}
          className="px-4 py-3 rounded border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
        <button
          type="submit"
          className="bg-[#180B50] text-white py-3 rounded shadow hover:bg-[#0D1276] transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}