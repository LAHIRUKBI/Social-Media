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
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await axios.delete(`http://localhost:8080/api/recipes/${id}`);
        fetchRecipes();
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  const handleUpdate = (recipe) => {
    navigate('/Update_share_recipe', { state: { recipe } });
  };

  const formatIngredients = (ingredients) => {
    try {
      const parsed = JSON.parse(ingredients);
      if (Array.isArray(parsed)) {
        return parsed.map(ing => `${ing.name} - ${ing.quantity}`).join('\n');
      }
      return ingredients;
    } catch {
      return ingredients;
    }
  };

  const formatInstructions = (instructions) => {
    try {
      const parsed = JSON.parse(instructions);
      if (Array.isArray(parsed)) {
        return parsed.map((inst, i) => `${i + 1}. ${inst}`).join('\n\n');
      }
      return instructions;
    } catch {
      return instructions;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600">My Shared Recipes</h1>
          <button 
            onClick={() => navigate('/Learning_add')}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Recipe
          </button>
        </div>

        {recipes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-medium text-gray-600 mt-4">No recipes yet</h3>
            <p className="text-gray-500 mt-2">You haven't shared any recipes yet. Click the button above to add your first recipe!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="md:flex">
                  {recipe.imageUrl && (
                    <div className="md:w-1/3">
                      <img
                        src={`http://localhost:8080${recipe.imageUrl}`}
                        alt={recipe.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                  )}
                  <div className={`p-6 ${recipe.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-orange-600 mb-1">{recipe.title}</h2>
                        <div className="flex gap-4 text-sm text-gray-500 mb-4">
                          {recipe.cookingTime && (
                            <span className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {recipe.cookingTime}
                            </span>
                          )}
                          {recipe.difficulty && (
                            <span className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              {recipe.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(recipe)}
                          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(recipe._id)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">Ingredients</h3>
                        <ul className="space-y-2">
                          {formatIngredients(recipe.ingredients).split('\n').map((ingredient, i) => (
                            ingredient.trim() && <li key={i} className="flex items-start">
                              <span className="text-orange-500 mr-2">•</span>
                              <span className="text-gray-700">{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">Instructions</h3>
                        <ol className="space-y-3">
                          {formatInstructions(recipe.instructions).split('\n\n').map((instruction, i) => (
                            instruction.trim() && <li key={i} className="text-gray-700">
                              {instruction.split('\n').map((line, j) => (
                                <p key={j} className={j > 0 ? 'mt-1' : ''}>{line}</p>
                              ))}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}