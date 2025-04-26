import React, { useState } from 'react';
import axios from 'axios';

export default function Learning_add() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);

  const userEmail = localStorage.getItem('userEmail');

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
      setTitle('');
      setIngredients('');
      setInstructions('');
      setImage(null);
    } catch (error) {
      console.error('Error response:', error.response); // Log the error response for debugging
      alert('Failed to submit recipe: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Share Your Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Recipe Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Enter recipe title"
              required 
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Ingredients</label>
            <textarea 
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="List ingredients separated by commas"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Instructions</label>
            <textarea 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Write step-by-step instructions"
              rows="5"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
