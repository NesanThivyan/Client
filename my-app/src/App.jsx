import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from './pages/Homescreen'
import Navbar from './components/navbar'
import AboutUsSection from './pages/Aboutusscreen'
import ServiceScreen from './pages/ServiceScreen'
import SignupPage from './pages/SignUpScreen'
import LoginScreen from './pages/LoginScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/about" element={<AboutUsSection />} />
        <Route path="/services" element={<ServiceScreen />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App