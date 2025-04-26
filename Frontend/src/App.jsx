import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sign from './pages/Sign' // Adjust path if needed
import Navigation from './Components/Navigation';
import Login from './pages/Login';
import Userprofile from './pages/Userprofile';
import Home from './pages/Home';
import Post_add from './pages/Post_add';
import Post_views from './pages/Post_views';
import Learning_Home from './pages/Learning_Home';
import Learning_add from './pages/Learning_add';
import Learnig_share_recipe from './pages/Learnig_share_recipe';

export default function App() {
  return (
    <BrowserRouter>
    <Navigation />
      <Routes>
        <Route path="/Sign" element={<Sign />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Userprofile" element={<Userprofile />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Post_add" element={<Post_add />} />
        <Route path="/Post_views" element={<Post_views />} />
        <Route path="/Learning_Home" element={<Learning_Home />} />
        <Route path="/Learning_add" element={<Learning_add />} />
        <Route path="/Learnig_share_recipe" element={<Learnig_share_recipe />} />
        
      </Routes>
    </BrowserRouter>
  )
}
