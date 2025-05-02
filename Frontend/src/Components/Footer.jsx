import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
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
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand/About */}
        <div>
          <h2 className="text-3xl font-extrabold text-teal-400 mb-4">CookConnect</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover, share, and connect through food. CookConnect is your daily dose of culinary inspiration and community.
          </p>

          {/* Admin Button */}
          <div className="mt-6">
            <button
              onClick={() => setShowAdminLogin(!showAdminLogin)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
            >
              Admin
            </button>

            {/* Admin Login Box */}
            {showAdminLogin && (
              <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-md">
                <input
                  type="password"
                  placeholder="Enter Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white border border-gray-600"
                />
                {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
                <button
                  onClick={handleLogin}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded font-semibold"
                >
                  LOGIN
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/recipes" className="hover:text-teal-300 transition">Top Recipes</a></li>
            <li><a href="/posts" className="hover:text-teal-300 transition">Community</a></li>
            <li><a href="/about" className="hover:text-teal-300 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-teal-300 transition">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/blog" className="hover:text-teal-300 transition">Blog</a></li>
            <li><a href="/faq" className="hover:text-teal-300 transition">FAQs</a></li>
            <li><a href="/terms" className="hover:text-teal-300 transition">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-teal-300 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
          <div className="flex gap-5 mt-2">
            <a href="#" className="text-gray-400 hover:text-teal-300 text-xl transition"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-teal-300 text-xl transition"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-teal-300 text-xl transition"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-teal-300 text-xl transition"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CookConnect. Crafted with ❤️ for food lovers everywhere.
      </div>
    </footer>
  );
}
