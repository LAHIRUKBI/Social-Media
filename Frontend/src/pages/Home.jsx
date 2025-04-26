import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const name = email ? email.split("@")[0] : "Chef";

  const [posts, setPosts] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/posts/all");
        setPosts(res.data.reverse()); // show newest first
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchAllRecipes = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/recipes/all'); // <-- Fetch all recipes
        setAllRecipes(res.data.reverse()); // newest first
      } catch (error) {
        console.error('Error fetching all recipes:', error);
      }
    };

    fetchPosts();
    fetchAllRecipes();
  }, [email]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/Login');
  };

  const handleLikePost = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleCommentPost = (postId, comment) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      )
    );
  };

  const handleLikeRecipe = (recipeId) => {
    setAllRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe._id === recipeId ? { ...recipe, likes: (recipe.likes || 0) + 1 } : recipe
      )
    );
  };

  const handleCommentRecipe = (recipeId, comment) => {
    setAllRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe._id === recipeId ? { ...recipe, comments: [...(recipe.comments || []), comment] } : recipe
      )
    );
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

      {/* Trending Posts */}
      <section className="max-w-5xl mx-auto px-4 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">🔥 Trending Posts</h3>

        {posts.length === 0 && allRecipes.length === 0 ? (
          <p className="text-gray-500">No recipes or posts available yet. Be the first to post!</p>
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
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>❤️ {post.likes} Likes • 💬 {post.comments.length} Comments</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="text-orange-500 hover:underline"
                  >
                    Like
                  </button>
                  <button
                    onClick={() => handleCommentPost(post.id, "Nice recipe!")}
                    className="text-blue-500 hover:underline"
                  >
                    Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* All Recipes */}
      <section className="max-w-4xl mx-auto px-4 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">🌍 All Recipes</h3>

        {allRecipes.length === 0 ? (
          <p className="text-center text-gray-600">No recipes available yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {allRecipes.map((recipe) => (
              <div key={recipe._id} className="bg-white rounded-lg shadow-md p-4">
                {recipe.imageUrl && (
                  <img
                    src={`http://localhost:8080${recipe.imageUrl}`}
                    alt={recipe.title}
                    className="rounded-md mb-3 h-40 w-full object-cover"
                  />
                )}
                <h4 className="text-lg font-semibold text-gray-800">{recipe.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{recipe.ingredients}</p>
                <p className="text-sm text-gray-500 mb-2">{recipe.instructions}</p> {/* Display instructions */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>❤️ {recipe.likes || 0} Likes • 💬 {(recipe.comments || []).length} Comments</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleLikeRecipe(recipe._id)}
                    className="text-orange-500 hover:underline"
                  >
                    Like
                  </button>
                  <button
                    onClick={() => handleCommentRecipe(recipe._id, "Looks delicious!")}
                    className="text-blue-500 hover:underline"
                  >
                    Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
