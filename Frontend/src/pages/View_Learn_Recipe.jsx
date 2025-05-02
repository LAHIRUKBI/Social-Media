import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function View_Learn_Recipe() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/learn');
      setRecipes(response.data);
    } catch (err) {
      console.error('Error fetching recipes:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      await axios.delete(`http://localhost:8080/learn/${id}`);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (err) {
      console.error('Error deleting recipe:', err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/Update_Learn_Recipe/${id}`);
  };

  const getMimeTypeFromExtension = (videoPath) => {
    const ext = videoPath.split('.').pop().toLowerCase();
    switch (ext) {
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      case 'ogg':
        return 'video/ogg';
      case 'mov':
        return 'video/quicktime';
      case 'avi':
        return 'video/x-msvideo';
      default:
        return 'video/mp4'; // fallback
    }
  };
  

  return (
    <section className="max-w-7xl mx-auto px-6 mb-16">
      <h3 className="text-3xl font-bold mb-8 text-gray-800">🔥 Recipe Collection</h3>

      {recipes.length === 0 ? (
        <p className="text-lg text-gray-500 text-center bg-gray-200 p-6 rounded-xl shadow-inner">
          No recipes available yet. Be the first to share a recipe!
        </p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-xl p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform hover:shadow-lg"
            >
              {/* Recipe Image */}
              {recipe.imageUrls && recipe.imageUrls.length > 0 && (
                <img
                  src={recipe.imageUrls[0]}
                  alt="Recipe"
                  className="rounded-xl mb-4 h-52 w-full object-cover shadow-sm"
                />
              )}

              <h4 className="text-xl font-semibold text-gray-900 mb-1">{recipe.recipeName}</h4>

              {/* Ingredients */}
              <div className="mb-4">
                <h5 className="text-lg font-medium text-gray-800">Ingredients</h5>
                <ul className="list-disc list-inside ml-6 text-sm text-gray-600">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              {/* Method */}
              <div className="mb-4">
                <h5 className="text-lg font-medium text-gray-800">Method Steps</h5>
                <ol className="list-decimal list-inside ml-6 text-sm text-gray-600">
                  {recipe.methodSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* Video */}
{recipe.videoPath && (
  <div className="mb-4">
    <h5 className="text-lg font-medium text-gray-800">Recipe Video</h5>
    <video controls className="w-full h-[350px] rounded-lg shadow-md">
      <source
        src={`http://localhost:8080${recipe.videoPath}`}
        type={getMimeTypeFromExtension(recipe.videoPath)}
      />
      Your browser does not support the video tag.
    </video>
  </div>
)}


              {/* Like & Comment */}
              <div className="flex items-center justify-between mt-6 space-x-6">
                <button className="text-orange-500 hover:underline font-medium">👍 Like</button>
                <button className="text-blue-500 hover:underline font-medium">💬 Comment</button>
              </div>

              {/* Likes */}
              <div className="border-t mt-4 pt-4 text-center text-sm text-gray-500">
                <span>❤️ {recipe.likes} Likes</span>
              </div>

              {/* Delete & Update Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(recipe.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
