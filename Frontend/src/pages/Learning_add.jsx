import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Learning_add() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);

  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();  // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData
    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    formData.append('email', userEmail);
    if (image) {
      formData.append('image', image); // Make sure the image is properly attached
    }

    try {
      const response = await axios.post('http://localhost:8080/api/recipes/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Recipe submitted successfully!');
      
      // Clear form inputs
      setTitle('');
      setIngredients('');
      setInstructions('');
      setImage(null);

      // Navigate to /Learning_Home page after successful submission
      navigate('/Learning_Home');
    } catch (error) {
      console.error('Error response:', error.response); // Log the error response for debugging
      alert('Failed to submit recipe: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800">Share Your Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Recipe Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Recipe Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:ring-2 focus:ring-teal-400"
              placeholder="Enter recipe title"
              required 
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Ingredients</label>
            <textarea 
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:ring-2 focus:ring-teal-400"
              placeholder="List ingredients separated by commas"
              rows="3"
              required
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Instructions</label>
            <textarea 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:ring-2 focus:ring-teal-400"
              placeholder="Write step-by-step instructions"
              rows="5"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Upload Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-sm text-gray-700 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-teal-500 text-white py-2 rounded-md text-sm hover:bg-teal-600 transition duration-300"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
