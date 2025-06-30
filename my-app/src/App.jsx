import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from './pages/Homescreen';
import Navbar from './components/navbar';
import AboutUsSection from './pages/Aboutusscreen';
import ServiceScreen from './pages/ServiceScreen';
import SignupPage from './pages/SignUpScreen';
import LoginScreen from './pages/LoginScreen';

import Contact from './pages/Contact';
import Feedback from './pages/feedback';
import UserScreen from './pages/UserScreen';
import UserDetailsForm from './pages/UserDetail';
import UserMedical from './pages/UserMedical';
import Admindashboard from './dashboards/Admindashboard';
import Footer from './components/footer';
import UserDashboard from './pages/Profile';
import UserGuardians from './pages/UserGuardians';
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./routes/PrivateRoute"; // Ensure this is created if you need protected routes
import AdminRoute from "./routes/AdminRoute"; // Ensure this is created if you need admin protected routes
import axios from './api/axios';

function App() {
  useEffect(() => {
    axios
      .get('http://localhost:5000/api', { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((err) => {
        if (err.response?.status !== 401) {
          console.error(err);
        }
      });
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <br />< br />
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/about" element={<AboutUsSection />} />
          <Route path="/services" element={<ServiceScreen />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/userscreen" element={<UserScreen />} />
          <Route path="/userdetails" element={<UserDetailsForm />} />
          {/* Only keep the protected versions below */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/usermedical"
            element={
              <PrivateRoute>
                <UserMedical />
              </PrivateRoute>
            }
          />
          <Route
            path="/guardian"
            element={
              <PrivateRoute>
                <UserGuardians />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Admindashboard />
              </AdminRoute>
            }
          />
          {/* Add more routes as needed */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;