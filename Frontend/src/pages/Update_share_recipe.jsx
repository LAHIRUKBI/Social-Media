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
      navigate('/Learnig_share_recipe'); // Navigate back
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update recipe");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-4">Update Recipe</h2>
        
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="w-full border p-2 rounded mb-4"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients"
        />
        <textarea
          className="w-full border p-2 rounded mb-4"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Instructions"
        />
        <input
          type="file"
          className="mb-4"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Update Recipe
        </button>
      </div>
    </div>
  );
}
