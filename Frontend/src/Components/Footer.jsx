import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';
import { MdOutlineEmail, MdLocationOn, MdLocalPhone } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === '123') {
      navigate('/Add_New_Recipes');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8 px-6 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-500 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand/About */}
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="text-4xl font-extrabold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                CookConnect
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover, share, and connect through food. CookConnect is your daily dose of culinary inspiration and community.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start">
                <MdOutlineEmail className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Lahiruilangasinha@gmail.com</span>
              </div>
              <div className="flex items-start">
                <MdOutlineEmail className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">amayabnadara@gmail.com</span>
              </div>
              <div className="flex items-start">
                <MdLocalPhone className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+94 (71) 091-0202</span>
              </div>
              <div className="flex items-start">
                <MdLocationOn className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">@SLIIT Malabe</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Explore
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/recipes" className="flex items-center text-gray-400 hover:text-teal-300 transition group">
                  <span className="w-1 h-1 bg-teal-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  Top Recipes
                </a>
              </li>
              <li>
                <a href="/posts" className="flex items-center text-gray-400 hover:text-teal-300 transition group">
                  <span className="w-1 h-1 bg-teal-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  Community
                </a>
              </li>
              <li>
                <a href="/about" className="flex items-center text-gray-400 hover:text-teal-300 transition group">
                  <span className="w-1 h-1 bg-teal-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="flex items-center text-gray-400 hover:text-teal-300 transition group">
                  <span className="w-1 h-1 bg-teal-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/blog" className="flex items-center text-gray-400 hover:text-teal-300 transition group">
                  <span className="w-1 h-1 bg-teal-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  Blog
                </a>
              </li>
              <li>
                <a href="/faq" className="flex items-center text-gray-400 hover:text-teal-300 transition group">
                  <span className="w-1 h-1 bg-teal-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  FAQs
                </a>
              </li>
              <li>
                <a href="/terms" className="flex items-center text-gray-400 hover:text-teal-300 transition group">
                  <span className="w-1 h-1 bg-teal-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="flex items-center text-gray-400 hover:text-teal-300 transition group">
                  <span className="w-1 h-1 bg-teal-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Admin */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
                Follow Us
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500"></span>
              </h3>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-teal-500 text-white flex items-center justify-center transition-all hover:rotate-12">
                  <FaFacebookF className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-teal-500 text-white flex items-center justify-center transition-all hover:rotate-12">
                  <FaInstagram className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-teal-500 text-white flex items-center justify-center transition-all hover:rotate-12">
                  <FaTwitter className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-teal-500 text-white flex items-center justify-center transition-all hover:rotate-12">
                  <FaYoutube className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-teal-500 text-white flex items-center justify-center transition-all hover:rotate-12">
                  <FaPinterestP className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-teal-500 text-white flex items-center justify-center transition-all hover:rotate-12">
                  <FaLinkedinIn className="text-lg" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 w-full rounded-l-md bg-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-4 py-2 rounded-r-md text-sm font-semibold transition-all">
                  Join
                </button>
              </div>
            </div>

            {/* Admin Button */}
            <div className="pt-4">
              <button
                onClick={() => setShowAdminLogin(!showAdminLogin)}
                className="relative overflow-hidden group bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center">
                  Admin Access
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>

              {/* Admin Login Box */}
              {showAdminLogin && (
                <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700 animate-fadeIn">
                  <h4 className="text-white text-sm font-medium mb-3">Admin Login</h4>
                  <input
                    type="password"
                    placeholder="Enter Admin Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-teal-400 text-sm"
                  />
                  {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
                  <button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white py-2 rounded font-semibold text-sm transition-all"
                  >
                    LOGIN
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} CookConnect. Crafted with ❤️ for food lovers everywhere.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-teal-300 text-xs transition">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-teal-300 text-xs transition">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-teal-300 text-xs transition">Cookies</a>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </footer>
  );
}