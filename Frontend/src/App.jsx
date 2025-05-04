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
import Post_update from './pages/Post_update';

import Learn_New_Recipes from './pages/Learn_New_Recipes';

import Footer from './Components/Footer';
import About_us from './pages/About_us';
import Add_New_Recipes from './pages/Add_New_Recipes';
import View_Learn_Recipe from './pages/View_Learn_Recipe';
import Update_Learn_Recipe from './pages/Update_Learn_Recipe';
import Shorts from './pages/Shorts';
import Update_share_recipe from './pages/Update_share_recipe';

export default function App() {
  return (
    <BrowserRouter>
    <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sign" element={<Sign />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Userprofile" element={<Userprofile />} />
        <Route path="/Post_add" element={<Post_add />} />
        <Route path="/Post_views" element={<Post_views />} />
        <Route path="/Learning_Home" element={<Learning_Home />} />
        <Route path="/Learning_add" element={<Learning_add />} />
        <Route path="/Learnig_share_recipe" element={<Learnig_share_recipe />} />
        <Route path="/Post_update" element={<Post_update />} />
        <Route path="/Learn_New_Recipes" element={<Learn_New_Recipes />} />
        <Route path="/About_us" element={<About_us />} />
        <Route path="/Add_New_Recipes" element={<Add_New_Recipes />} />
        <Route path="/View_Learn_Recipe" element={<View_Learn_Recipe />} />
        <Route path="/Update_Learn_Recipe/:id" element={<Update_Learn_Recipe />} />
        <Route path="/Shorts" element={<Shorts />} />
        <Route path="/Update_share_recipe" element={<Update_share_recipe />} />



      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
