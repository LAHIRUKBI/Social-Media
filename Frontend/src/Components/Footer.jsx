import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand/About */}
        <div>
          <h2 className="text-2xl font-bold text-teal-400 mb-3">CookConnect</h2>
          <p className="text-sm text-gray-300">
            CookConnect is your favorite place to share and explore homemade recipes,
            connect with fellow food lovers, and get inspired every day.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/recipes" className="hover:text-teal-400">Recipes</a></li>
            <li><a href="/posts" className="hover:text-teal-400">Community Posts</a></li>
            <li><a href="/about" className="hover:text-teal-400">About Us</a></li>
            <li><a href="/contact" className="hover:text-teal-400">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="text-gray-300 hover:text-teal-400"><FaFacebookF /></a>
            <a href="#" className="text-gray-300 hover:text-teal-400"><FaInstagram /></a>
            <a href="#" className="text-gray-300 hover:text-teal-400"><FaTwitter /></a>
            <a href="#" className="text-gray-300 hover:text-teal-400"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} CookConnect. All rights reserved.
      </div>
    </footer>
  );
}
