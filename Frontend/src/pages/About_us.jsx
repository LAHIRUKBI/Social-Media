import React from 'react';

export default function About_us() {
  return (
    <div className="bg-white min-h-screen px-6 py-10">
      {/* Intro Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">About Cook<span className="text-gray-800">Book</span></h1>
        <p className="text-gray-600 text-lg">
          Welcome to <span className="font-semibold text-gray-800">CookBook</span> — your favorite cooking social media hub where food lovers and creators connect,
          share, and learn new recipes together.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mt-16 max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          alt="Cooking Mission"
          className="rounded-xl shadow-md object-cover w-full h-80"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to bring the cooking community together by offering a platform where anyone can
            share their culinary creativity, learn from others, and build meaningful connections through food.
            Whether you’re a seasoned chef or a passionate home cook, CookBook is your space to grow.
          </p>
        </div>
      </div>

     {/* Team Section */}
     <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">👨‍🍳 Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[
            { name: "Lahiru", role: "Founder & Developer", image: "https://randomuser.me/api/portraits/men/32.jpg" },
            { name: "Amaya", role: "UI/UX Designer", image: "https://randomuser.me/api/portraits/women/65.jpg" },
            { name: "Maneth", role: "Content Creator", image: "https://randomuser.me/api/portraits/men/45.jpg" },
            { name: "Pasindi", role: "Content Creator", image: "https://randomuser.me/api/portraits/women/44.jpg" }
          ].map((member, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-2xl hover:scale-105 transition transform duration-300">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Call to Action */}
      <div className="mt-20 text-center bg-red-50 py-10 px-6 rounded-xl shadow-inner">
        <h2 className="text-2xl font-bold text-red-600 mb-3">Join the Community</h2>
        <p className="text-gray-700 mb-6">Become a part of a growing family of food lovers. Start sharing your recipes today!</p>
        <a
          href="/sign"
          className="inline-block bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
