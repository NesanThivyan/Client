// ChatBox.jsx
import React, { useState, useEffect, useRef } from "react";
import ambulanceImg from "../images/Ambu2.png";
import bgImg from "../images/Ambulance2.jpg";

export default function ChatBox({ user = "user1" }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef(null);

  /* ───────── API helpers ───────── */
  const sendMessage = async () => {
    if (!input.trim() || isSending) return;
    const newMessage = { sender: user, text: input.trim() };

    // Optimistic UI update
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsSending(true);

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });
      // Optionally: re-fetch to confirm server state
    } finally {
      setIsSending(false);
    }
  };

  const fetchMessages = async () => {
    const res = await fetch("/api/chat");
    const data = await res.json();
    setMessages(data);
  };

  /* ───────── Effects ───────── */
  useEffect(() => { fetchMessages(); }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ───────── JSX ───────── */
  return (
      <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="bg-white shadow-xl rounded-lg flex w-full max-w-4xl overflow-hidden relative z-10">
        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-4">
          <img
            src={ambulanceImg}
            alt="Ambulance Illustration"
            className="w-full max-w-5xl object-contain transform translate-x-[40%] translate-y-[40%]"
          />
        </div>

    <div className="mx-auto flex h-[520px] w-full max-w-lg flex-col overflow-hidden rounded-2xl border
                    border-gray-200 bg-white shadow-xl">
      {/* Header */}
      <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-700
                         px-4 py-3 text-white">
        <h2 className="text-lg font-semibold">Live Support</h2>
        <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-400" />
      </header>

      {/* Messages */}
      <section className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-blue-300">
        {messages.map((msg, idx) => {
          const mine = msg.sender === user;
          return (
            <article
              key={idx}
              className={`max-w-xs rounded-2xl px-4 py-2 text-sm shadow
                          ${mine
                            ? "ml-auto bg-blue-100 text-blue-800"
                            : "mr-auto bg-gray-100 text-gray-800"}`}
            >
              <p>{msg.text}</p>
            </article>
          );
        })}
        <div ref={bottomRef} />
      </section>

      {/* Input */}
      <footer className="flex items-center gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3">
        <input
          type="text"
          className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none"
          placeholder="Type a message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={isSending}
        />
        <button
          onClick={sendMessage}
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white
                     transition hover:bg-blue-700 disabled:opacity-50"
          disabled={isSending}
        >
          {isSending ? "…" : "Send"}
        </button>
      </footer>
    </div>
        </div>
        </div>
  );
}
