import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      const name = email.split("@")[0];
      setUsername(name);
    }
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-3xl font-extrabold text-red-600 tracking-wide">
          Cook<span className="text-gray-800">Book</span>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 text-gray-700 font-medium text-base flex items-center">
          <Link 
            to="/" 
            className="hover:text-red-600 transition duration-200 relative after:content-[''] after:absolute after:h-0.5 after:w-0 after:bg-red-500 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Home
          </Link>
          <Link 
            to="/notifications" 
            className="hover:text-red-600 transition duration-200 relative after:content-[''] after:absolute after:h-0.5 after:w-0 after:bg-red-500 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Notification
          </Link>
          <Link 
            to="/Learning_Home" 
            className="hover:text-red-600 transition duration-200 relative after:content-[''] after:absolute after:h-0.5 after:w-0 after:bg-red-500 after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Learning Plans
          </Link>
          {username ? (
            <Link 
              to="/Userprofile" 
              className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition duration-300"
            >
              {username}
            </Link>
          ) : (
            <Link 
              to="/sign" 
              className="bg-gray-800 text-white px-4 py-2 rounded-full shadow hover:bg-gray-900 transition duration-300"
            >
              Signin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
