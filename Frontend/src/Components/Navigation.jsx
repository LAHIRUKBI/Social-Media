import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navigation() {
  const [profileImage, setProfileImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      axios.get(`http://localhost:8080/api/users/${email}`)
        .then(res => {
          if (res.data.profileImage) {
            setProfileImage(`http://localhost:8080/${res.data.profileImage}`);
          }
        })
        .catch(err => {
          console.error("Failed to fetch profile image:", err);
        });
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="text-3xl font-black tracking-wide text-red-600 flex items-center gap-1">
          Cook<span className="text-gray-800">Book</span>
        </div>

        {/* Hamburger Menu Button (mobile only) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-red-600 text-2xl focus:outline-none">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`flex-col md:flex-row md:flex md:items-center space-y-4 md:space-y-0 space-x-0 md:space-x-6 font-medium text-base text-gray-700 absolute md:static bg-white md:bg-transparent top-20 left-0 w-full md:w-auto px-6 py-4 md:p-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out ${menuOpen ? 'flex' : 'hidden'}`}>
          <Link to="/" onClick={closeMenu} className="hover:text-red-600">Home</Link>
          <Link to="/Shorts" onClick={closeMenu} className="hover:text-red-600">Shorts</Link>
          <Link to="/notifications" onClick={closeMenu} className="hover:text-red-600">Notification</Link>
          <Link to="/Learning_Home" onClick={closeMenu} className="hover:text-red-600">Learning Plans</Link>
          <Link to="/About_us" onClick={closeMenu} className="hover:text-red-600">About Us</Link>

          {profileImage ? (
            <Link to="/Userprofile" onClick={closeMenu}>
              <img
                src={profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-red-500 hover:scale-105 transition-transform duration-300"
              />
            </Link>
          ) : (
            <Link
              to="/sign"
              onClick={closeMenu}
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
