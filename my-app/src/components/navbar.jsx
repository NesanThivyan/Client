import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

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

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("signup"); // "signup" or "login"
  const navigate = useNavigate();

  // Helper for modal content
  const renderModalContent = () => {
    if (modalType === "signup") {
      return (
        <>
          <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
          <div className="flex gap-6 mb-8">
            <div className="flex-1 bg-blue-100 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition">
              <button
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                onClick={() => {
                  setShowModal(false);
                  navigate("/signup");
                }}
              >
                Hospital Sign Up
              </button>
            </div>
            <div className="flex-1 bg-green-100 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition">
              <button
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                onClick={() => {
                  setShowModal(false);
                  navigate("/signup");
                }}
              >
                User Sign Up
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <h2 className="text-xl font-bold mb-4 text-center">Log In</h2>
          <div className="flex gap-6 mb-8">
            <div className="flex-1 bg-blue-100 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition">
              <button
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                onClick={() => {
                  setShowModal(false);
                  navigate("/login");
                }}
              >
                Hospital Login
              </button>
            </div>
            <div className="flex-1 bg-green-100 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition">
              <button
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                onClick={() => {
                  setShowModal(false);
                  navigate("/login");
                }}
              >
                User Login
              </button>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center px-5 py-2 bg-[#030329] text-yellow-400 fixed top-0 left-0 right-0 z-50">
        <img src={logo} alt="Logo" className="h-8" />
        <div className="space-x-6 text-sm">
          <button
            className="hover:underline"
            onClick={() => {
              setModalType("signup");
              setShowModal(true);
            }}
          >
            sign up
          </button>
          <button
            className="hover:underline"
            onClick={() => {
              setModalType("login");
              setShowModal(true);
            }}
          >
            log in
          </button>
        </div>
      </nav>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {renderModalContent()}
        </Modal>
      )}
    </>
  );
};

export default Navbar;