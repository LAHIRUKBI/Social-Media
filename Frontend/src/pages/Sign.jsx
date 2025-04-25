import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Sign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/register", {
        email,
        password
      });
      setMessage(response.data);
      if (response.data === "User registered successfully!") {
        setTimeout(() => navigate('/login'), 1000); // redirect to login after registration
      }
    } catch (err) {
      setMessage("Registration failed.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
      <div className="relative z-10 w-full max-w-md px-8 py-10 bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-red-100 p-3 rounded-full shadow-md">
            <span className="text-3xl">🍕</span>
          </div>
          <h2 className="text-3xl font-bold text-white mt-4">Welcome to FoodGram</h2>
          <p className="text-sm text-white/80 mt-1">Register & start sharing your recipes!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/80 text-gray-800 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/80 text-gray-800 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Let’s Cook 🍳
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-white font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
