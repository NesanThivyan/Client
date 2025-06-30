import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:5000';

export default function UserDashboard() {
  /* Retrieve logged‑in user ID from your auth context or localStorage */
  const userId = JSON.parse(localStorage.getItem('user'))._id;  // adjust to your auth shape
  const socketRef = useRef(null);

  /* Optional toast state */
  const [toast, setToast] = useState(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    // Tell server which personal room to join
    socketRef.current.emit('joinRoom', userId);

    // Listen for booking confirmations
    socketRef.current.on('bookingConfirmed', booking => {
      setToast(` Booking confirmed! Pickup: ${booking.pickupLocation}`);
      // play sound / show fancy snackbar here instead of alert
      setTimeout(() => setToast(null), 5000);
    });

    return () => socketRef.current.disconnect();
  }, [userId]);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      {/* Your normal dashboard content here */}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded shadow-lg animate-bounce">
          {toast}
        </div>
      )}
    </div>
  );
}
