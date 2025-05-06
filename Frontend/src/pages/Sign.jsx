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
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch (err) {
      setMessage("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center relative overflow-hidden">

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-8 hover:shadow-orange-500/20 transition-all duration-300">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white p-4 rounded-full shadow-md transform transition-transform duration-300">
            <span className="text-4xl">🍕</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mt-4 font-serif">Welcome to FoodGram</h2>
          <p className="text-sm text-white/80 mt-2">Create your account and start sharing recipes!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 pl-12 bg-white/90 text-gray-700 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
            />
            <span className="absolute left-4 top-3.5 text-gray-500">✉️</span>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pl-12 bg-white/90 text-gray-700 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
            />
            <span className="absolute left-4 top-3.5 text-gray-500">🔒</span>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Sign Up</span>
            <span>🍳</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-orange-300 font-semibold hover:text-orange-200 hover:underline transition-colors duration-200"
            >
              Login here
            </Link>
          </p>
        </div>

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
            message.includes("successfully") 
              ? "bg-green-500/80 text-white" 
              : "bg-red-500/80 text-white"
          } transition-all duration-300`}>
            {message}
          </div>
        )}

        <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-orange-400/30 blur-xl"></div>
        <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-red-400/30 blur-xl"></div>
      </div>
    </div>
  );
}
