import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const name = email ? email.split("@")[0] : "Chef";

  const handleLogout = () => {
    localStorage.clear();
    navigate('/Login');
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white shadow-md px-6 py-4">
        <h1 className="text-2xl font-bold text-orange-600">🍳 CookBook</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Hi, {name}!</span>
          <button
            onClick={handleLogout}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="text-center my-8">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to CookBook, {name}!</h2>
        <p className="text-gray-600 mt-2">Share your favorite recipes, explore others, and connect with food lovers 🍲</p>
      </section>

      {/* Feed */}
      <section className="max-w-4xl mx-auto px-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">🔥 Trending Recipes</h3>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Post Card */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src="https://images.unsplash.com/photo-1604908554168-ec1fd9cda602"
              alt="Recipe"
              className="rounded-md mb-3 h-40 w-full object-cover"
            />
            <h4 className="text-lg font-semibold text-gray-800">Creamy Mushroom Pasta</h4>
            <p className="text-sm text-gray-600">Tried this today! Super creamy and full of flavor 🍝</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src="https://images.unsplash.com/photo-1600628422012-bc1c8852a26d"
              alt="Grilled Dish"
              className="rounded-md mb-3 h-40 w-full object-cover"
            />
            <h4 className="text-lg font-semibold text-gray-800">Grilled Chicken BBQ</h4>
            <p className="text-sm text-gray-600">Sunday dinner vibes with this smoky grill 🔥</p>
          </div>

          {/* Add more cards as needed */}
        </div>
      </section>
    </div>
  );
}
