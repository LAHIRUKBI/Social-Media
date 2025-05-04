import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Update_share_recipe() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(state.recipe.title);
  const [ingredients, setIngredients] = useState(state.recipe.ingredients);
  const [instructions, setInstructions] = useState(state.recipe.instructions);
  const [image, setImage] = useState(null);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    if (image) formData.append("image", image);

    try {
      await axios.put(`http://localhost:8080/api/recipes/${state.recipe.id}`, formData);
      alert("Recipe updated successfully!");
      navigate('/Learnig_share_recipe');
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update recipe");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-orange-600 mb-8">
          Update Your Recipe
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter recipe title"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Ingredients</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="List ingredients..."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Instructions</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Write cooking steps..."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Upload New Image</label>
            <input
              type="file"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-orange-100 file:text-orange-600
              hover:file:bg-orange-200"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            onClick={handleUpdate}
            className="mt-6 w-full bg-orange-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
