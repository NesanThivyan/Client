import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 min-w-[350px] shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default function IntroScreenTrigger() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-4 mb-8">
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          onClick={() => setShowModal(true)}
        >
          Sign Up
        </button>
        <button
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          onClick={() => setShowModal(true)}
        >
          Login
        </button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="flex gap-6 mb-8">
            <div className="flex-1 bg-blue-100 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition">
              <span className="text-lg font-bold mb-2">Hospital Register</span>
              <button
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                onClick={() => {
                  setShowModal(false);
                  navigate("/signup");
                }}
              >
                Register as Hospital
              </button>
            </div>
            <div className="flex-1 bg-green-100 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition">
              <span className="text-lg font-bold mb-2">User Register</span>
              <button
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                onClick={() => {
                  setShowModal(false);
                  navigate("/signup");
                }}
              >
                Register as User
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}