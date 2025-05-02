import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Shorts() {
  const [recipes, setRecipes] = useState([]);

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

  const getMimeTypeFromExtension = (videoPath) => {
    const ext = videoPath.split('.').pop().toLowerCase();
    switch (ext) {
      case 'mp4': return 'video/mp4';
      case 'webm': return 'video/webm';
      case 'ogg': return 'video/ogg';
      case 'mov': return 'video/quicktime';
      case 'avi': return 'video/x-msvideo';
      default: return 'video/mp4';
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-900">🎥 Cooking Shorts</h2>

      {recipes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No shorts to display.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300"
            >
              {/* Video or Image */}
              {recipe.videoPath ? (
                <video
                  controls
                  className="w-full h-[300px] object-cover"
                >
                  <source
                    src={`http://localhost:8080${recipe.videoPath}`}
                    type={getMimeTypeFromExtension(recipe.videoPath)}
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                recipe.imageUrls && recipe.imageUrls.length > 0 && (
                  <img
                    src={recipe.imageUrls[0]}
                    alt="Recipe"
                    className="w-full h-[300px] object-cover"
                  />
                )
              )}

              <div className="p-6">
                {/* Recipe Name */}
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{recipe.recipeName}</h3>

                {/* Ingredients */}
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-700">🧂 Ingredients:</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm ml-4">
                    {recipe.ingredients.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Method */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700">👨‍🍳 Steps:</h4>
                  <ol className="list-decimal list-inside text-gray-600 text-sm ml-4">
                    {recipe.methodSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Likes and Comment */}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-red-500 font-medium">❤️ {recipe.likes} Likes</span>
                  <button className="text-blue-500 hover:underline text-sm">💬 Comment</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
