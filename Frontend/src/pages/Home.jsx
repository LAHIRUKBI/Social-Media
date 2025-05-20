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
        const res = await axios.get('http://localhost:8080/api/recipes/all');
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

  const handleLikeRecipe = async (recipeId) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/recipes/like/${recipeId}`, null, {
        params: { userEmail: email },
      });
      const updatedRecipe = res.data;
      setAllRecipes(prevRecipes =>
        prevRecipes.map(recipe =>
          recipe._id === recipeId ? updatedRecipe : recipe
        )
      );
    } catch (error) {
      console.error("Error liking recipe:", error);
    }
  };

  const handleCommentRecipe = (recipeId, comment) => {
    setAllRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe._id === recipeId ? { ...recipe, comments: [...(recipe.comments || []), comment] } : recipe
      )
    );
  };

  const formatIngredients = (ingredients) => {
    try {
      const parsed = JSON.parse(ingredients);
      if (Array.isArray(parsed)) {
        return parsed.slice(0, 3).map(ing => `${ing.name}`).join(', ');
      }
      return ingredients;
    } catch {
      return ingredients.length > 50 ? ingredients.substring(0, 50) + '...' : ingredients;
    }
  };

  const formatInstructions = (instructions) => {
    try {
      const parsed = JSON.parse(instructions);
      if (Array.isArray(parsed)) {
        return parsed[0].length > 50 ? parsed[0].substring(0, 50) + '...' : parsed[0];
      }
      return instructions.length > 50 ? instructions.substring(0, 50) + '...' : instructions;
    } catch {
      return instructions.length > 50 ? instructions.substring(0, 50) + '...' : instructions;
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-gray-100 min-h-screen">

      {/* Navbar */}
      <nav className="flex justify-between items-center bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wide">FoodGRAM</h1>
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
        <h3 className="text-3xl font-bold mb-8 text-gray-800">🍽️ All Recipes</h3>
        {allRecipes.length === 0 ? (
          <p className="text-lg text-center text-gray-600">No recipes available yet.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allRecipes.map((recipe) => (
              <div 
                key={recipe._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                {recipe.imageUrl && (
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={`http://localhost:8080${recipe.imageUrl}`}
                      alt={recipe.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-white/80 rounded-full px-2 py-1 text-xs font-medium text-orange-600">
                      ⏱️ {recipe.cookingTime || 'N/A'}
                    </div>
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-orange-700 truncate">{recipe.title}</h4>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {recipe.difficulty || 'Easy'}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-2">
                    👨‍🍳 By {recipe.email?.split('@')[0] || 'Anonymous'}
                  </p>
                  
                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-700 mb-1">Ingredients:</p>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {formatIngredients(recipe.ingredients)}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-1">Instructions:</p>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {formatInstructions(recipe.instructions)}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <button 
                      onClick={() => handleLikeRecipe(recipe._id)}
                      className="flex items-center gap-1 text-orange-500 hover:text-orange-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {recipe.likes || 0} Likes
                    </button>
                    
                    <span className="text-gray-500">
                      💬 {(recipe.comments || []).length} Comments
                    </span>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}