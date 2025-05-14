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
        // Optimistically update the UI by filtering out the deleted recipe
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
      } catch (error) {
        console.error('Error deleting recipe:', error);
        // If there's an error, refetch the recipes to ensure consistency
        fetchRecipes();
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-orange-600 font-serif">My Recipe Journal</h1>
            <p className="text-amber-600 mt-1">Your culinary creations, beautifully organized</p>
          </div>
          <button 
            onClick={() => navigate('/Learning_add')}
            className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Recipe
          </button>
        </div>

        {recipes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-2xl mx-auto border border-amber-100">
            <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 font-serif">Your recipe book is empty</h3>
            <p className="text-amber-600 mt-2">Start your culinary journey by adding your first recipe!</p>
            <button 
              onClick={() => navigate('/Learning_add')}
              className="mt-6 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
            >
              Create First Recipe
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-all">
                <div className="md:flex h-full">
                  {/* Recipe Image */}
                  {recipe.imageUrl && (
                    <div className="md:w-1/3 relative">
                      <img
                        src={`http://localhost:8080${recipe.imageUrl}`}
                        alt={recipe.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={() => handleUpdate(recipe)}
                          className="bg-white/90 hover:bg-white text-amber-600 p-2 rounded-full shadow-sm transition-colors hover:rotate-6"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(recipe.id)}
                          className="bg-white/90 hover:bg-white text-red-500 p-2 rounded-full shadow-sm transition-colors hover:rotate-6"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Recipe Content */}
                  <div className={`p-6 ${recipe.imageUrl ? 'md:w-2/3' : 'w-full'} flex flex-col`}>
                    <div className="mb-4">
                      <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold text-orange-700 mb-1 font-serif">{recipe.title}</h2>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mt-3">
                        {recipe.cookingTime && (
                          <span className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full text-sm text-amber-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {recipe.cookingTime}
                          </span>
                        )}
                        {recipe.difficulty && (
                          <span className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full text-sm text-amber-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            {recipe.difficulty}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                      {/* Ingredients */}
                      <div className="bg-amber-50 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-orange-700 mb-3 pb-1 border-b border-amber-200 font-serif">Ingredients</h3>
                        <ul className="space-y-2">
                          {formatIngredients(recipe.ingredients).split('\n').map((ingredient, i) => (
                            ingredient.trim() && (
                              <li key={i} className="flex items-start">
                                <span className="text-amber-500 mr-2 mt-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span className="text-amber-800">{ingredient}</span>
                              </li>
                            )
                          ))}
                        </ul>
                      </div>

                      {/* Instructions */}
                      <div className="bg-orange-50 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-orange-700 mb-3 pb-1 border-b border-orange-200 font-serif">Instructions</h3>
                        <ol className="space-y-3">
                          {formatInstructions(recipe.instructions).split('\n\n').map((instruction, i) => (
                            instruction.trim() && (
                              <li key={i} className="flex">
                                <span className="bg-orange-500 text-white font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">
                                  {i + 1}
                                </span>
                                <div className="text-orange-800">
                                  {instruction.split('\n').map((line, j) => (
                                    <p key={j} className={j > 0 ? 'mt-1' : ''}>{line}</p>
                                  ))}
                                </div>
                              </li>
                            )
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