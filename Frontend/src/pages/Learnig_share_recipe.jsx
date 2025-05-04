import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Learnig_share_recipe() {
  const [recipes, setRecipes] = useState([]);
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, [userEmail]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/recipes/user', {
        params: { email: userEmail }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting recipe with ID:", id); // Add this line
    try {
      await axios.delete(`http://localhost:8080/api/recipes/${id}`);
      fetchRecipes(); // Refresh list
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };
  

  const handleUpdate = (recipe) => {
    navigate('/Update_share_recipe', { state: { recipe } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">My Shared Recipes</h1>

        {recipes.length === 0 ? (
          <p className="text-center text-gray-600">You haven't shared any recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
                {recipe.imageUrl && (
                  <img
                    src={`http://localhost:8080${recipe.imageUrl}`}
                    alt={recipe.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-2xl font-semibold text-orange-500 mb-2">{recipe.title}</h2>
                <h3 className="text-lg font-medium text-gray-700 mb-1">Ingredients:</h3>
                <p className="text-gray-600 mb-3">{recipe.ingredients}</p>
                <h3 className="text-lg font-medium text-gray-700 mb-1">Instructions:</h3>
                <p className="text-gray-600 mb-3">{recipe.instructions}</p>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleUpdate(recipe)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
