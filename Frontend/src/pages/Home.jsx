import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const name = email ? email.split("@")[0] : "Chef";

  const [posts, setPosts] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [commentInput, setCommentInput] = useState({});
  const [comments, setComments] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/posts/all");
        const fetchedPosts = res.data.reverse(); // show newest first
        setPosts(fetchedPosts);
        
        // Fetch comments for each post
        fetchedPosts.forEach(post => fetchCommentsForPost(post.id));
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
  
  const fetchCommentsForPost = async (postId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/comments/post/${postId}`);
      setComments(prev => ({
        ...prev,
        [postId]: res.data
      }));
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
    }
  };

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

  const handleCommentInputChange = (postId, value) => {
    setCommentInput(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  const handleCommentPost = async (postId) => {
    if (!commentInput[postId] || commentInput[postId].trim() === '') return;
    
    try {
      const newComment = {
        postId: postId,
        userEmail: email || 'Anonymous', // Ensure email is never null
        content: commentInput[postId].trim()
      };
      
      const response = await axios.post('http://localhost:8080/api/comments/create', newComment);
      
      if (response && response.data) {
        // Update comments state safely
        setComments(prev => ({
          ...prev,
          [postId]: [...(prev[postId] || []), response.data]
        }));
        
        // Clear input
        setCommentInput(prev => ({
          ...prev,
          [postId]: ''
        }));
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };
  
  // New functions for editing comments
  const startEditing = (comment) => {
    setEditingCommentId(comment.id);
    setEditCommentText(comment.content);
  };
  
  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditCommentText('');
  };
  
  const handleEditChange = (e) => {
    setEditCommentText(e.target.value);
  };
  
  const saveEditedComment = async (commentId, postId) => {
    if (!editCommentText.trim()) return;
    
    try {
      // Send content as a JSON object
      const response = await axios.put(
        `http://localhost:8080/api/comments/${commentId}?userEmail=${email}`,
        { content: editCommentText }
      );
      
      if (response && response.data) {
        // Update comments state with edited comment
        setComments(prev => ({
          ...prev,
          [postId]: prev[postId].map(comment => 
            comment.id === commentId ? response.data : comment
          )
        }));
        
        // Exit editing mode
        setEditingCommentId(null);
        setEditCommentText('');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment. ' + (error.response?.data || 'Please try again.'));
    }
  };
  
  // New function for deleting comments
  const deleteComment = async (commentId, postId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/comments/${commentId}?userEmail=${email}`);
      
      // Remove deleted comment from state
      setComments(prev => ({
        ...prev,
        [postId]: prev[postId].filter(comment => comment.id !== commentId)
      }));
      
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. ' + (error.response?.data || 'Please try again.'));
    }
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
                  <span>❤️ {post.likes} Likes • 💬 {comments[post.id]?.length || 0} Comments</span>
                </div>

                <div className="flex gap-4 mt-4 justify-center">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="text-orange-500 hover:underline font-medium"
                  >
                    👍 Like
                  </button>
                </div>
                
                {/* Comments section */}
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Comments ({comments[post.id]?.length || 0})
                  </h4>
                  
                  <div className="flex mb-3 bg-white rounded-full shadow-sm overflow-hidden border border-gray-100">
                    <input
                      type="text"
                      value={commentInput[post.id] || ''}
                      onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-grow px-4 py-2 focus:outline-none text-sm"
                    />
                    <button
                      onClick={() => handleCommentPost(post.id)}
                      className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 font-medium transition-colors duration-300 hover:from-orange-500 hover:to-orange-600 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Post
                    </button>
                  </div>
                  
                  {/* Display comments */}
                  {comments[post.id] && comments[post.id].length > 0 && (
                    <div className="mt-3 max-h-60 overflow-y-auto pr-1 space-y-3">
                      {comments[post.id].map((comment) => (
                        <div key={comment.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                                {comment.userEmail ? comment.userEmail.split('@')[0].charAt(0).toUpperCase() : 'A'}
                              </div>
                              <span className="font-medium text-gray-800">
                                {comment.userEmail ? comment.userEmail.split('@')[0] : 'Anonymous'}
                                <span className="text-xs text-gray-500 ml-2">{new Date(comment.createdAt).toLocaleDateString()}</span>
                              </span>
                            </div>
                            
                            {/* Only show edit/delete for user's own comments */}
                            {comment.userEmail === email && (
                              <div className="flex space-x-1">
                                <button 
                                  onClick={() => startEditing(comment)} 
                                  className="text-xs text-gray-400 hover:text-blue-500 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                  title="Edit comment"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button 
                                  onClick={() => deleteComment(comment.id, post.id)} 
                                  className="text-xs text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                  title="Delete comment"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {editingCommentId === comment.id ? (
                            <div className="mt-1">
                              <textarea
                                value={editCommentText}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                rows="2"
                              />
                              <div className="flex justify-end space-x-2 mt-2">
                                <button
                                  onClick={cancelEditing}
                                  className="text-xs py-1.5 px-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => saveEditedComment(comment.id, post.id)}
                                  className="text-xs py-1.5 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-700 text-sm">{comment.content}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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
