import React from 'react';
import { FaBookOpen, FaUtensils, FaPlusCircle } from 'react-icons/fa';

export default function Learning_Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-orange-700 mb-4 flex items-center justify-center gap-3">
          <FaBookOpen /> Learning Plane
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Discover new recipes, master your cooking skills, and share your creations with the world!
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Learn Recipes */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <FaUtensils className="text-5xl text-orange-500 mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">Learn New Recipes</h2>
            <p className="text-gray-600">
              Access step-by-step guides and videos to cook delicious dishes from around the world.
            </p>
          </div>

          {/* Share Recipes */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <FaPlusCircle className="text-5xl text-orange-500 mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">Share Your Recipes</h2>
            <p className="text-gray-600">
              Post your own cooking creations, tips, and tricks to inspire the community!
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <button className="bg-orange-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-orange-600 transition">
            Start Learning Now
          </button>
        </div>
      </div>
    </div>
  );
}
