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

  const handleLikePost = async (postId) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/posts/like/${postId}`, null, {
        params: { userEmail: email },
      });
      const updatedPost = res.data;
  
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
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
    <div className="bg-gradient-to-r from-blue-50 via-white to-gray-100 min-h-screen">

      {/* Navbar */}
      <nav className="flex justify-between items-center bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wide">🍳 CookBook</h1>
        <div className="flex items-center gap-6">
          <span className="text-lg font-medium">Hi, {name}!</span>
          <button
            onClick={handleLogout}
            className="bg-white text-orange-600 px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="text-center my-12 px-4">
        <h2 className="text-4xl font-bold text-gray-800">Welcome to CookBook, {name}!</h2>
        <p className="text-lg text-gray-600 mt-3">
          Share your favorite recipes, explore others, and connect with food lovers 🍲
        </p>
      </section>

      {/* Trending Posts */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">🔥 Trending Posts</h3>

        {posts.length === 0 && allRecipes.length === 0 ? (
          <p className="text-lg text-gray-500 text-center bg-gray-200 p-6 rounded-xl shadow-inner">
            No recipes or posts available yet. Be the first to post!
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-xl p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform hover:shadow-lg"
              >
                {post.imageUrls.length > 0 && (
                  <img
                    src={post.imageUrls[0]}
                    alt="Recipe"
                    className="rounded-xl mb-4 h-52 w-full object-cover shadow-sm"
                  />
                )}
                <h4 className="text-xl font-semibold text-gray-900 mb-1">
                  {post.email.split('@')[0]}'s Post
                </h4>
                <p className="text-sm text-gray-700 mb-4">{post.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                  <span>❤️ {post.likes} Likes • 💬 {post.comments.length} Comments</span>
                </div>

                <div className="flex gap-4 mt-4 justify-center">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="text-orange-500 hover:underline font-medium"
                  >
                    👍 Like
                  </button>
                  <button
                    onClick={() => handleCommentPost(post.id, 'Nice recipe!')}
                    className="text-blue-500 hover:underline font-medium"
                  >
                    💬 Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* All Recipes */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h3 className="text-2xl font-semibold mb-6 text-gray-700">🌍 All Recipes</h3>

        {allRecipes.length === 0 ? (
          <p className="text-lg text-center text-gray-600">No recipes available yet.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allRecipes.map((recipe) => (
              <div key={recipe._id} className="bg-white rounded-lg shadow-lg p-6 transition transform hover:scale-105">
                {recipe.imageUrl && (
                  <img
                    src={`http://localhost:8080${recipe.imageUrl}`}
                    alt={recipe.title}
                    className="rounded-md mb-4 h-48 w-full object-cover"
                  />
                )}
                <h4 className="text-lg font-semibold text-orange-500 mb-3">{recipe.title}</h4>
                <h5 className="text-md font-medium text-gray-700 mb-2">Ingredients:</h5>
                <p className="text-gray-600 mb-3">{recipe.ingredients}</p>

                <h5 className="text-md font-medium text-gray-700 mb-2">Instructions:</h5>
                <p className="text-gray-600 mb-4">{recipe.instructions}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>❤️ {recipe.likes || 0} Likes • 💬 {(recipe.comments || []).length} Comments</span>
                </div>

                <div className="flex gap-4 mt-4 justify-center">
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
