import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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
        setTimeout(() => navigate('/login'), 1000); // redirect after 1 second
      }
    } catch (err) {
      setMessage("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white p-4 rounded-full shadow-md">
            <span className="text-4xl">🍕</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mt-4">Welcome to FoodGram</h2>
          <p className="text-sm text-white/70 mt-2">Create your account and start sharing recipes!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/80 text-gray-700 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/80 text-gray-700 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
          >
            Sign Up 🍳
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-400 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>

        {message && (
          <p className="mt-4 text-center text-white font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
