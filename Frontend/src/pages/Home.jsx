import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const name = email ? email.split("@")[0] : "Chef";

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/posts/all");
        setPosts(res.data.reverse()); // show newest first
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

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
        <p className="text-gray-600 mt-2">
          Share your favorite recipes, explore others, and connect with food lovers 🍲
        </p>
      </section>

      {/* Feed */}
      <section className="max-w-4xl mx-auto px-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">🔥 Trending Recipes</h3>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts available yet. Be the first to post!</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                {post.imageUrls.length > 0 && (
                  <img
                    src={post.imageUrls[0]}
                    alt="Recipe"
                    className="rounded-md mb-3 h-40 w-full object-cover"
                  />
                )}
                <h4 className="text-lg font-semibold text-gray-800">{post.email.split('@')[0]}'s Post</h4>
                <p className="text-sm text-gray-600 mb-2">{post.description}</p>
                <p className="text-xs text-gray-400">❤️ {post.likes} Likes • 💬 {post.comments.length} Comments</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
