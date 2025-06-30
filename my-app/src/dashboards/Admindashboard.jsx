import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import Footer from "../components/footer";

/* ---------- Backend API Base URLs ---------- */
const API_BASE_URL = "http://localhost:5000/api/chat";
const BOOKING_API_BASE_URL = "http://localhost:5000/api/bookings";
const USERS_API_BASE_URL = "http://localhost:5000/api/users";
const SOCKET_SERVER_URL = "http://localhost:5000";

/* ---------- generic editable table ---------- */
function EditableTable({ rows, setRows, columns }) {
  const toggleEdit = (id) =>
    setRows((r) =>
      r.map((row) =>
        row.id === id ? { ...row, isEditing: !row.isEditing } : row
      )
    );
  const handleChange = (id, field, value) =>
    setRows((r) => r.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  const removeRow = (id) => setRows((r) => r.filter((row) => row.id !== id));
  return (
    <table className="w-full table-auto rounded-lg overflow-hidden border border-blue-300">
      <thead>
        <tr className="bg-blue-700 text-white text-left shadow-md">
          {columns.map((c) => (
            <th key={c.key} className="px-4 py-3 font-semibold text-sm">{c.label}</th>
          ))}
          <th className="px-4 py-3 w-32 font-semibold text-sm">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-b border-blue-200 even:bg-blue-50 odd:bg-white text-gray-800 hover:bg-blue-100 transition duration-150 ease-in-out">
            {columns.map((c) => (
              <td key={c.key} className="px-4 py-2 text-sm">
                {row.isEditing ? (
                  <input
                    className="w-full rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    value={row[c.key]}
                    onChange={(e) => handleChange(row.id, c.key, e.target.value)}
                  />
                ) : (
                  row[c.key]
                )}
              </td>
            ))}
            <td className="px-4 py-2">
              {row.isEditing ? (
                <button
                  onClick={() => toggleEdit(row.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md shadow-sm mr-2 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
                >Save</button>
              ) : (
                <button
                  onClick={() => toggleEdit(row.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md shadow-sm mr-2 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >Edit</button>
              )}
              <button
                onClick={() => removeRow(row.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow-sm transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
              >Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------- read-only table (for medical info) ---------- */
function ReadOnlyTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <p className="text-gray-500 italic text-center py-10">No data available.</p>;
  }
  const keys = Object.keys(rows[0] || {}).filter((k) => k !== "id");
  return (
    <table className="w-full table-auto rounded-lg overflow-hidden border border-blue-300">
      <thead>
        <tr className="bg-blue-600 text-white text-left shadow-md">
          {keys.map((k) => (
            <th key={k} className="px-4 py-3 font-semibold text-sm">{k.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id} className="border-b border-blue-200 even:bg-blue-50 odd:bg-white text-gray-800 hover:bg-blue-100 transition duration-150 ease-in-out">
            {keys.map((k) => (
              <td key={k} className="px-4 py-2 text-sm">{r[k]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------- Chat Component ---------- */
function Chat({ userId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      if (messages.length === 0) setLoading(true);
      setError(null);
      const response = await fetch(API_BASE_URL, );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const sortedMessages = data
        .map((msg) => ({
          id: msg._id,
          text: msg.text,
          senderId: msg.sender,
          timestamp: new Date(msg.createdAt).toLocaleString(),
        }))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setMessages(sortedMessages);
    } catch (err) {
      setError("Failed to load messages. Please ensure the backend is running and accessible at " + API_BASE_URL);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    const messageToSend = newMessage;
    setNewMessage("");
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: userId, text: messageToSend }),
      });
      if (!response.ok) throw new Error(`Failed to send message: ${response.status}`);
      fetchMessages();
    } catch (err) {
      setError("Failed to send message. Please check backend and network.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-10 text-gray-600">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
        Loading chat...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-full py-10 text-red-500 text-lg">
        <span className="mr-2">error</span> {error}
      </div>
    );
  }
  return (
    <div className="flex flex-col h-[70vh] bg-white rounded-xl shadow-lg p-5 border border-gray-200">
      <div className="flex-1 overflow-y-auto mb-4 p-3 border border-gray-200 rounded-lg bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {messages.length === 0 ? (
          <p className="text-gray-500 italic text-center mt-8">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-3 ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-2xl shadow-sm break-words ${
                  msg.senderId === userId
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <div className="font-semibold text-xs mb-1 opacity-90">
                  {msg.senderId === userId ? "You" : msg.senderId}
                </div>
                <p className="text-sm leading-snug">{msg.text}</p>
                <div className={`text-xs mt-1 ${msg.senderId === userId ? "text-blue-100" : "text-gray-600"}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center border-t border-gray-200 pt-4">
        <input
          type="text"
          className="flex-1 rounded-l-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out text-gray-800"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => { if (e.key === "Enter") handleSendMessage(); }}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
        >
          Send
          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 00.116.855c.31.42.753.657 1.187.734.72.124 1.25.567 1.583 1.096l1 1.5a1 1 0 001.788 0l7-14a1 1 0 00-.116-.855c-.31-.42-.753-.657-1.187-.734-.72-.124-1.25-.567-1.583-1.096L10.894 2.553z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ---------- main dashboard component ---------- */
export default function App() {
  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('chatUserId');
    if (storedUserId) return storedUserId;
    const newId = crypto.randomUUID();
    localStorage.setItem('chatUserId', newId);
    return newId;
  });

  // --- UI State for Navigation (MOVED UP) ---
  const [openUserMenu, setOpenUserMenu] = useState(true);
  const [activeView, setActiveView] = useState("User Details");

  // --- NEW: State for real users fetched from backend ---
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  // --- Existing booking and socket states ---
  const [bookings, setBookings] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [bookingError, setBookingError] = useState(null);
  const socketRef = useRef(null);

  // --- Fetch users for admin view ---
  const fetchUsers = async () => {
    setUsersLoading(true);
    setUsersError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(USERS_API_BASE_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data.users || data); 
    } catch (err) {
      setUsersError(err.message);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (activeView === "User Details") fetchUsers();
  }, [activeView]);

  // --- Booking fetch and socket logic (unchanged) ---
  const fetchBookings = async () => {
    setBookingLoading(true);
    setBookingError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found. Please log in.');
      const response = await fetch(`${BOOKING_API_BASE_URL}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBookings(data.data);
    } catch (err) {
      setBookingError(`Failed to load bookings: ${err.message}. Ensure backend is running and you are authorized.`);
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, { withCredentials: true });
    socketRef.current.on('connect', () => {
      socketRef.current.emit('joinAdminNotifications');
    });
    socketRef.current.on('newBookingRequest', (newBooking) => {
      setBookings(prevBookings => [newBooking, ...prevBookings]);
    });
    socketRef.current.on('bookingStatusUpdated', (updatedBooking) => {
      setBookings(prevBookings =>
        prevBookings.map(b => (b._id === updatedBooking._id ? updatedBooking : b))
      );
    });
    return () => { if (socketRef.current) socketRef.current.disconnect(); };
  }, []);

  useEffect(() => { fetchBookings(); }, []);

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');
      setBookings(prevBookings =>
        prevBookings.map(b =>
          b._id === bookingId ? { ...b, status: newStatus, updating: true } : b
        )
      );
      const response = await fetch(`${BOOKING_API_BASE_URL}/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update status: ${response.status}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
      setBookings(prevBookings =>
        prevBookings.map(b =>
          b._id === bookingId ? { ...b, updating: false } : b
        )
      );
    }
  };

  const link = (label) => (
    <li
      key={label}
      onClick={() => {
        setActiveView(label);
        if (!label.includes("User")) setOpenUserMenu(false);
      }}
      className={`cursor-pointer hover:text-blue-300 py-2 px-3 rounded-md transition duration-200 ease-in-out ${
        activeView === label ? "text-blue-300 font-semibold bg-blue-800 shadow-inner" : ""
      }`}
    >
      {label}
    </li>
  );

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const otherBookings = bookings.filter(b => b.status !== 'pending');

  return (
    <div className="flex min-h-screen bg-blue-300 text-white font-inter antialiased">
      {/* ---- Sidebar Navigation ---- */}
      <aside className="w-64 bg-blue-900 p-5 rounded-r-3xl shadow-2xl flex flex-col justify-between border-r border-blue-700">
        <div>
          <h2 className="text-2xl font-extrabold mb-8 bg-darkblue-900 px-4 py-3 rounded-full text-center tracking-wide text-blue-100 shadow-inner">
            Admin Panel
          </h2>
          <div className="text-xs text-gray-300 mb-6 px-3 py-2 bg-blue-800 rounded-lg text-center break-all shadow-inner">
            Your User ID: <br /><span className="font-mono text-blue-200 text-sm font-bold select-all">{userId}</span>
          </div>
          <ul className="space-y-2 text-base font-medium">
            <li
              onClick={() => setOpenUserMenu((o) => !o)}
              className={`cursor-pointer hover:text-blue-300 flex items-center justify-between py-2 px-3 rounded-md transition duration-200 ease-in-out ${
                activeView.includes("User") ? "text-blue-300 font-semibold bg-blue-800 shadow-inner" : ""
              }`}
            >
              <span>User Management</span>
              <span>{openUserMenu ? "▾" : "▸"}</span>
            </li>
            {openUserMenu && (
              <ul className="ml-4 space-y-1 text-sm border-l-2 border-blue-900 pl-4 py-1">
                {link("User Details")}
                {link("Medical Details")}
              </ul>
            )}
            {link("Ambulance Details")}
            {link("Booking Management")}
            {link("Alert Details")}
            {link("Chat")}
          </ul>
        </div>
        <div className="mt-8 text-center text-xs text-gray-400 font-light">
          &copy; 2025 Secure Admin. All rights reserved.
        </div>
      </aside>

      {/* ---- Main Content Area ---- */}
      <main className="flex-1 p-10 flex flex-col">
        <h1 className="text-4xl font-extrabold mb-10 text-blue-100 drop-shadow-lg text-center">
          {activeView}
        </h1>
        <div className="bg-gray-50 p-8 rounded-2xl shadow-3xl text-black flex-1 flex flex-col border border-gray-100">
          {/* --- User Details Table --- */}
          {activeView === "User Details" && (
            usersLoading ? (
              <div>Loading users...</div>
            ) : usersError ? (
              <div className="text-red-500">{usersError}</div>
            ) : (
              <table className="w-full table-auto rounded-lg overflow-hidden border border-blue-300">
                <thead>
                  <tr className="bg-blue-600 text-white text-left shadow-md">
                    <th className="px-4 py-3 font-semibold text-sm">Name</th>
                    <th className="px-4 py-3 font-semibold text-sm">Email</th>
                    <th className="px-4 py-3 font-semibold text-sm">Medical Details</th>
                    <th className="px-4 py-3 font-semibold text-sm">Guardian Details</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">
                        {user.medicalDetails
                          ? <>
                              Condition: {user.medicalDetails.condition}<br/>
                              Allergy: {user.medicalDetails.allergy}<br/>
                              Medication: {user.medicalDetails.medication}
                            </>
                          : "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {user.guardian
                          ? <>
                              Name: {user.guardian.name}<br/>
                              Phone: {user.guardian.phone}<br/>
                              Relationship: {user.guardian.relationship}
                            </>
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {/* --- Medical Details Table (optional, can be customized) --- */}
          {activeView === "Medical Details" && (
            <ReadOnlyTable rows={users.map(u => ({
              id: u._id,
              name: u.name,
              condition: u.medicalDetails?.condition || "",
              allergy: u.medicalDetails?.allergy || "",
              medication: u.medicalDetails?.medication || "",
              note: u.medicalDetails?.note || "",
            }))} />
          )}

          {/* --- Ambulance Details Table (placeholder) --- */}
          {activeView === "Ambulance Details" && (
            <EditableTable
              rows={[]}
              setRows={() => {}}
              columns={[
                { key: "ambId", label: "Ambulance ID" },
                { key: "plate", label: "Plate #" },
                { key: "driver", label: "Driver" },
                { key: "status", label: "Status" },
              ]}
            />
          )}

          {/* --- Booking Management Table --- */}
          {activeView === "Booking Management" && (
            bookingLoading ? (
              <div>Loading bookings...</div>
            ) : bookingError ? (
              <div className="text-red-500">{bookingError}</div>
            ) : (
              <table className="w-full table-auto rounded-lg overflow-hidden border border-blue-300">
                <thead>
                  <tr className="bg-blue-600 text-white text-left shadow-md">
                    <th className="px-4 py-3 font-semibold text-sm">Patient Name</th>
                    <th className="px-4 py-3 font-semibold text-sm">Pickup</th>
                    <th className="px-4 py-3 font-semibold text-sm">Dropoff</th>
                    <th className="px-4 py-3 font-semibold text-sm">Emergency</th>
                    <th className="px-4 py-3 font-semibold text-sm">Age</th>
                    <th className="px-4 py-3 font-semibold text-sm">Condition</th>
                    <th className="px-4 py-3 font-semibold text-sm">Contact</th>
                    <th className="px-4 py-3 font-semibold text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
  {bookings.map(booking => (
    <tr key={booking._id}>
      <td className="px-4 py-2">{booking.patientName}</td>
      <td className="px-4 py-2">{booking.pickupLocation}</td>
      <td className="px-4 py-2">{booking.dropoffLocation}</td>
      <td className="px-4 py-2">{booking.emergencyType}</td>
      <td className="px-4 py-2">{booking.patientAge}</td>
      <td className="px-4 py-2">{booking.patientCondition}</td>
      <td className="px-4 py-2">{booking.contactNumber}</td>
      <td className="px-4 py-2">
        {booking.status}
        {booking.status === "pending" && (
          <div className="mt-2 flex gap-2">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
              disabled={booking.updating}
              onClick={() => handleUpdateBookingStatus(booking._id, "accepted")}
            >
              Accept
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
              disabled={booking.updating}
              onClick={() => handleUpdateBookingStatus(booking._id, "cancelled")}
            >
              Cancel
            </button>
          </div>
        )}
      </td>
    </tr>
  ))}
</tbody>
              </table>
            )
          )}

          {/* --- Alert Details Placeholder --- */}
          {activeView === "Alert Details" && (
            <p className="italic text-gray-600 text-xl py-20 text-center">
              This section is currently under development. Stay tuned for updates!
            </p>
          )}

          {/* --- Chat --- */}
          {activeView === "Chat" && (
            <Chat userId={userId} />
          )}
        </div>
      </main>
    </div>
  );
}