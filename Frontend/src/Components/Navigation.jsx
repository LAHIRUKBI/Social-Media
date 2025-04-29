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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-red-500">CookBook</div>
        <div className="space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-red-500 transition">Home</Link>
          <Link to="/notifications" className="hover:text-red-500 transition">Notification</Link>
          <Link to="/Learning_Home" className="hover:text-red-500 transition">Learning Plans</Link>
          {username ? (
            <Link to="/Userprofile" className="hover:text-red-500 transition">{username}</Link>
          ) : (
            <Link to="/sign" className="hover:text-red-500 transition">Signin</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
