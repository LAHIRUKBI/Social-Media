import React from 'react';
import { FaBookOpen, FaUtensils, FaPlusCircle, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // 👈 Import Link

export default function Learning_Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-orange-700 mb-6 flex items-center justify-center gap-3">
          <FaBookOpen className="text-6xl text-orange-600" />
          <span className="text-4xl">Learning Plane</span>
        </h1>
        <p className="text-gray-700 text-lg mb-10 px-4">
          Discover new recipes, master your cooking skills, and share your creations with the world! 
          Our platform is here to inspire your culinary journey. 🍽️
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {/* Learn Recipes */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
            <FaUtensils className="text-6xl text-orange-500 mb-6 mx-auto" />
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Learn New Recipes</h2>
            <p className="text-gray-600">
              Access step-by-step guides and videos to cook delicious dishes from around the world.
            </p>
          </div>

          {/* Share Recipes */}
          <Link to="/Learning_add">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer">
              <FaPlusCircle className="text-6xl text-orange-500 mb-6 mx-auto" />
              <h2 className="text-2xl font-semibold text-orange-600 mb-4">Share Your Recipes</h2>
              <p className="text-gray-600">
                Post your own cooking creations, tips, and tricks to inspire the community!
              </p>
            </div>
          </Link>

          {/* View My Share */}
          <Link to="/Learnig_share_recipe">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer">
              <FaEye className="text-6xl text-green-500 mb-6 mx-auto" />
              <h2 className="text-2xl font-semibold text-green-600 mb-4">View My Share</h2>
              <p className="text-gray-600">
                Check all the recipes you have shared with the cooking community.
              </p>
            </div>
          </Link>
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <button className="bg-orange-500 text-white py-4 px-8 rounded-full text-xl font-semibold hover:bg-orange-600 transition duration-300">
            Start Learning Now
          </button>
        </div>
      </div>
    </div>
  );
}
