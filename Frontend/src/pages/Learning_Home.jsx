import React from 'react';
import { FaBookOpen, FaUtensils, FaPlusCircle, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Learning_Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-orange-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-4">
            <FaBookOpen className="text-5xl text-orange-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-orange-700">Learning Plane</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore step-by-step recipes, share your cooking passion, and build your culinary skills with our engaging platform. 🍳
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Learn Recipes */}

<Link to="/Learn_New_Recipes">
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer">
    <FaUtensils className="text-6xl text-orange-500 mb-6 mx-auto" />
    <h2 className="text-2xl font-semibold text-orange-600 mb-4">Learn New Recipes</h2>
    <p className="text-gray-600">
      Access step-by-step guides and videos to cook delicious dishes from around the world.
    </p>
  </div>
</Link>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center">
            <FaUtensils className="text-5xl text-orange-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Learn New Recipes</h2>
            <p className="text-gray-600">
              Explore cooking guides and video tutorials from various cuisines to sharpen your kitchen skills.
            </p>
          </div>


          {/* Share Recipes */}
          <Link to="/Learning_add">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center cursor-pointer hover:scale-105 transform duration-200">
              <FaPlusCircle className="text-5xl text-orange-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Share Your Recipes</h2>
              <p className="text-gray-600">
                Submit your favorite recipes and inspire other cooking lovers with your tasty ideas!
              </p>
            </div>
          </Link>

          {/* View My Share */}
          <Link to="/Learnig_share_recipe">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center cursor-pointer hover:scale-105 transform duration-200">
              <FaEye className="text-5xl text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">View My Share</h2>
              <p className="text-gray-600">
                Check out all the delicious dishes you’ve posted and see how others respond to your creativity.
              </p>
            </div>
          </Link>
        </div>

        {/* Extra Info Section */}
        <div className="mt-20 bg-orange-50 p-8 rounded-xl shadow-inner">
          <h3 className="text-2xl font-bold text-orange-700 mb-4 text-center">Why Join Our Learning Plane?</h3>
          <ul className="grid sm:grid-cols-2 gap-6 text-gray-700 text-base list-disc list-inside max-w-4xl mx-auto">
            <li>Boost your cooking confidence with hands-on learning.</li>
            <li>Be part of a growing community of food lovers.</li>
            <li>Track and manage your shared recipes.</li>
            <li>Share your personal twists on traditional dishes.</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg py-3 px-8 rounded-full transition shadow-md hover:shadow-lg">
            Start Learning Now
          </button>
        </div>
      </div>
    </div>
  );
}
