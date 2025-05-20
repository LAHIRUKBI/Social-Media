import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Navigation() {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      axios.get(`http://localhost:8080/api/users/${email}`)
        .then(res => {
          if (res.data.profileImage) {
            setProfileImage(`http://localhost:8080/${res.data.profileImage}`);
          } else {
            // Set a default profile image
            setProfileImage("https://www.w3schools.com/howto/img_avatar.png");
          }
          
        })
        .catch(err => {
          console.error("Failed to fetch profile image:", err);
        });
    }
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="text-3xl font-black tracking-wide text-red-600 flex items-center gap-1">
          Food<span className="text-gray-800">GRAM</span>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 text-gray-700 font-medium text-base flex items-center">

          <Link
            to="/"
            className="hover:text-red-600 relative after:content-[''] after:absolute after:h-0.5 after:w-0 after:bg-red-500 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Home
          </Link>

          <Link
            to="/Shorts"
            className="hover:text-red-600 relative after:content-[''] after:absolute after:h-0.5 after:w-0 after:bg-red-500 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Shorts
          </Link>

          <Link
            to="/notifications"
            className="hover:text-red-600 relative after:content-[''] after:absolute after:h-0.5 after:w-0 after:bg-red-500 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Notification
          </Link>

          <Link
            to="/Learning_Home"
            className="hover:text-red-600 relative after:content-[''] after:absolute after:h-0.5 after:w-0 after:bg-red-500 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Learning Plans
          </Link>

          <Link
            to="/About_us"
            className="hover:text-red-600 relative after:content-[''] after:absolute after:h-0.5 after:w-0 after:bg-red-500 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
          >
            About Us
          </Link>

          {profileImage ? (
  <Link to="/Userprofile">
    <img
      src={profileImage}
      alt="Profile"
      className="w-10 h-10 rounded-full object-cover border-2 border-red-500 hover:scale-105 transition-transform duration-300"
    />
  </Link>
) : (
  <Link
    to="/sign"
    className="bg-red-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-red-600 transition duration-300"
  >
    Sign In
  </Link>
)}

        </div>
      </div>
    </nav>
  );
}
