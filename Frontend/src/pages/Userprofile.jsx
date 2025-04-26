import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Userprofile() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const name = email ? email.split("@")[0] : "User";
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/150?img=3");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:8080/api/users/${email}`)
        .then(res => {
          if (res.data.profileImage) {
            setProfileImage(`http://localhost:8080/${res.data.profileImage}`);
          }
        })
        .catch(err => console.error("Error fetching user:", err));
    }
  }, [email]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.put(`http://localhost:8080/api/users/upload/${email}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data.profileImage) {
          setProfileImage(`http://localhost:8080/api/users/images/${res.data.profileImage}`);
        }
      } catch (err) {
        console.error("Error uploading image:", err);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden relative">

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition-all"
        >
          Logout
        </button>

        {/* Cover Photo */}
        <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e')" }}></div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start px-8 py-6">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white -mt-20 shadow-xl object-cover cursor-pointer"
              onClick={handleImageClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-500 mt-1">Food Enthusiast | Home Cook</p>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p><span className="font-semibold">Email:</span> {email}</p>
              <p><span className="font-semibold">Followers:</span> 120</p>
              <p><span className="font-semibold">Posts:</span> 35</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-8 mb-6">
          <button
            onClick={() => navigate("/Post_add")}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all shadow-md"
          >
            ➕ Add New Post
          </button>
          <button
            onClick={() => navigate("/Post_views")}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all shadow-md"
          >
            👀 View Posts
          </button>
        </div>

        {/* Posts Section */}
        <div className="px-8 pb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Recent Posts</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <h4 className="font-bold text-lg text-gray-800 mb-2">My Spaghetti Recipe 🍝</h4>
              <p className="text-gray-600 text-sm">Just tried out this new recipe and it turned out amazing!</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <h4 className="font-bold text-lg text-gray-800 mb-2">Grill Night 🔥</h4>
              <p className="text-gray-600 text-sm">Had a great time grilling with the fam!</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
