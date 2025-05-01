import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function View_Learn_Recipe() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/learn');
        setRecipes(response.data);
      } catch (err) {
        console.error('Error fetching recipes:', err);
      }
    };
    fetchRecipes();
  }, []);

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

              {/* Recipe Name */}
              <h4 className="text-xl font-semibold text-gray-900 mb-1">
                {recipe.recipeName}
              </h4>

              {/* Recipe Ingredients */}
              <div className="mb-4">
                <h5 className="text-lg font-medium text-gray-800">Ingredients</h5>
                <ul className="list-disc list-inside ml-6 text-sm text-gray-600">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              {/* Recipe Method Steps */}
              <div className="mb-4">
                <h5 className="text-lg font-medium text-gray-800">Method Steps</h5>
                <ol className="list-decimal list-inside ml-6 text-sm text-gray-600">
                  {recipe.methodSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* Recipe Video */}
              {recipe.videoPath && (
                <div className="mb-4">
                  <h5 className="text-lg font-medium text-gray-800">Recipe Video</h5>
                  <div className="relative mb-4">
                    <video controls className="w-full h-[350px] rounded-lg shadow-md hover:opacity-90 transition-opacity">
                      <source src={`http://localhost:8080${recipe.videoPath}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              {/* Like & Comment Buttons */}
              <div className="flex items-center justify-between mt-6 space-x-6">
                <button className="text-orange-500 hover:underline font-medium">
                  👍 Like
                </button>
                <button className="text-blue-500 hover:underline font-medium">
                  💬 Comment
                </button>
              </div>

              {/* Likes */}
              <div className="border-t mt-4 pt-4 text-center text-sm text-gray-500">
                <span>❤️ {recipe.likes} Likes</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
