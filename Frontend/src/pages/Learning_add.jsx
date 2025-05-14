import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Learning_add() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);

  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    formData.append('email', userEmail);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/recipes/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Recipe submitted successfully!');
      setTitle('');
      setIngredients('');
      setInstructions('');
      setImage(null);
      navigate('/Learning_Home');
    } catch (error) {
      console.error('Error response:', error.response);
      alert('Failed to submit recipe: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">📖 Share Your Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Recipe Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
              placeholder="e.g., Classic Chocolate Cake"
              required 
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Ingredients</label>
            <textarea 
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
              placeholder="List ingredients, separated by commas"
              rows="3"
              required
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Instructions</label>
            <textarea 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
              placeholder="Step-by-step instructions"
              rows="5"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Upload Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-sm text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-3 rounded-lg transition-all duration-300 shadow-md"
            >
              📤 Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
