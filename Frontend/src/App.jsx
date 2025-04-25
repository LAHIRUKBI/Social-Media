import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sign from './pages/Sign' // Adjust path if needed
import Navigation from './Components/Navigation';
import Login from './pages/Login';
import Userprofile from './pages/Userprofile';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
    <Navigation />
      <Routes>
        <Route path="/Sign" element={<Sign />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Userprofile" element={<Userprofile />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
