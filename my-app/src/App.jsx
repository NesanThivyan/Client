import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from './pages/Homescreen'
import Navbar from './components/navbar'
import AboutUsSection from './pages/Aboutusscreen'
import ServiceScreen from './pages/ServiceScreen'
import SignupPage from './pages/SignUpScreen'
import LoginScreen from './pages/LoginScreen'
import IntroScreenTrigger from "./pages/IntroScreen";
import Contact from './pages/Contact';
import Feedback from './pages/feedback';
import UserScreen from './pages/UserScreen';
import UserDetailsForm from './pages/UserDetail';
import axios from 'axios';

function App() {
  useEffect(() => {
  axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
    .then(res => console.log(res.data))
    .catch(err => {
      if (err.response?.status !== 401) {
        console.error(err);
      }
    });
}, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/about" element={<AboutUsSection />} />
        <Route path="/services" element={<ServiceScreen />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/intro" element={<IntroScreenTrigger />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/userscreen" element={<UserScreen />} />
        <Route path="/userdetails" element={<UserDetailsForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  )
}

export default App