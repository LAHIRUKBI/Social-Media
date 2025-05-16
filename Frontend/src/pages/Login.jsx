import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import GoogleButton from '../Components/GoogleButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password
      });

      setMessage(response.data);

      if (response.data === "Login successful!") {
        localStorage.setItem("userEmail", email);
        setTimeout(() => navigate('/'), 1000);
      }

    } catch (err) {
      setMessage("Login failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


const handleGoogleSuccess = (response) => {
  console.log("Google auth success:", response);
  const message = response.data?.message || response.data;
  setMessage(message);
  
  if (message.includes("successful")) {
    // Store user data if needed
    if (response.data?.user) {
      localStorage.setItem("userEmail", response.data.user.email);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem("userProfileImage", response.data.user.profileImage);
    }
    setTimeout(() => navigate('/'), 1000);
  }
};

const handleGoogleError = (error) => {
    console.error("Google auth error:", error);
    
    let errorMessage = "Google authentication failed";
    if (typeof error === 'string') {
        errorMessage = error;
    } else if (error?.message) {
        errorMessage = error.message;
    } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
    }
    
    setMessage(errorMessage);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center relative overflow-hidden">
      {/* Animated floating food elements */}
      <div className="absolute top-20 left-20 animate-bounce animation-delay-100">
        <span className="text-3xl opacity-80">🍔</span>
      </div>
      <div className="absolute bottom-20 right-20 animate-bounce animation-delay-300">
        <span className="text-3xl opacity-80">🍕</span>
      </div>
      <div className="absolute top-1/3 right-1/4 animate-bounce animation-delay-500">
        <span className="text-2xl opacity-80">🍩</span>
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-bounce animation-delay-700">
        <span className="text-2xl opacity-80">🍰</span>
      </div>

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 mx-4 hover:shadow-orange-500/30 transition-all duration-300">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white p-4 rounded-full shadow-lg transform hover:rotate-12 transition-transform duration-300 mb-4">
            <span className="text-4xl">🍴</span>
          </div>
          <h2 className="text-3xl font-bold text-white mt-2 font-sans">
            Welcome to <span className="text-orange-300">FoodGram</span>
          </h2>
          <p className="text-sm text-white/80 mt-2 font-medium">
            Your culinary journey begins here!
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-xl peer focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 shadow-sm"
              />
              <label className="absolute left-4 top-3 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-500 peer-focus:bg-white peer-focus:px-1 peer-focus:rounded peer-focus:-translate-y-1/2">
                Email
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/90 text-gray-800 rounded-xl peer focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 shadow-sm"
              />
              <label className="absolute left-4 top-3 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-500 peer-focus:bg-white peer-focus:px-1 peer-focus:rounded peer-focus:-translate-y-1/2">
                Password
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${isLoading ? 'opacity-80' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  <span>Login</span>
                  <span>🔑</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/30"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white/10 text-white/80">Or continue with</span>
        </div>
      </div>

      <GoogleButton 
        onSuccess={handleGoogleSuccess} 
        onError={handleGoogleError} 
      />

        <div className="mt-8 text-center space-y-3">
          <p className="text-white/80 text-sm">
            Don't have an account?{' '}
            <Link 
              to="/Sign" 
              className="text-orange-300 font-semibold hover:text-orange-200 hover:underline transition-colors duration-200"
            >
              Sign up now
            </Link>
          </p>
          <Link 
            to="/forgot-password" 
            className="inline-block text-sm text-white/60 hover:text-white/80 hover:underline transition-colors duration-200"
          >
            Forgot your password?
          </Link>
        </div>

        {message && (
          <div className={`mt-6 p-3 rounded-lg text-center font-medium ${message.includes("successful") ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'} transition-all duration-300`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}