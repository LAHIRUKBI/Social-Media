import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Update_Learn_Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    recipeName: '',
    ingredients: [''],
    methodSteps: [''],
    videoPath: ''
  });
  const [newVideo, setNewVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/learn/${id}`);
      if (response.data) {
        setRecipe({
          recipeName: response.data.recipeName,
          ingredients: response.data.ingredients || [''],
          methodSteps: response.data.methodSteps || [''],
          videoPath: response.data.videoPath || ''
        });
      } else {
        setError('Recipe not found');
      }
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch recipe data');
      setLoading(false);
      console.error('Error fetching recipe:', err);
    }
  };

  fetchRecipe();
}, [id]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, value, field) => {
    const updated = [...recipe[field]];
    updated[index] = value;
    setRecipe({ ...recipe, [field]: updated });
  };

  const addArrayField = (field) => {
    setRecipe({ ...recipe, [field]: [...recipe[field], ''] });
  };

  const removeArrayField = (index, field) => {
    const updated = [...recipe[field]];
    updated.splice(index, 1);
    setRecipe({ ...recipe, [field]: updated });
  };

  const handleVideoChange = (e) => {
    setNewVideo(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('recipeName', recipe.recipeName);
      formData.append('ingredients', JSON.stringify(recipe.ingredients.filter(ing => ing.trim() !== '')));
      formData.append('methodSteps', JSON.stringify(recipe.methodSteps.filter(step => step.trim() !== '')));
      
      if (newVideo) {
        formData.append('video', newVideo);
      } else if (recipe.videoPath) {
        formData.append('videoPath', recipe.videoPath);
      }

      await axios.put(`http://localhost:8080/learn/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert('Recipe updated successfully!');
      navigate('/View_Learn_Recipe');
    } catch (err) {
      console.error('Error updating recipe:', err);
      alert('Failed to update recipe. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading recipe data...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white shadow-lg rounded-lg mt-10 mb-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Update Recipe</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-6">
          <label className="block font-semibold mb-1 text-gray-700">Recipe Name</label>
          <input
            name="recipeName"
            value={recipe.recipeName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter recipe name"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Ingredients</label>
          {recipe.ingredients.map((ing, i) => (
            <div key={i} className="flex mb-2">
              <input
                value={ing}
                onChange={(e) => handleArrayChange(i, e.target.value, 'ingredients')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={`Ingredient ${i + 1}`}
              />
              {recipe.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(i, 'ingredients')}
                  className="ml-2 px-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('ingredients')}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Ingredient
          </button>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Method Steps</label>
          {recipe.methodSteps.map((step, i) => (
            <div key={i} className="flex mb-2">
              <textarea
                value={step}
                onChange={(e) => handleArrayChange(i, e.target.value, 'methodSteps')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={`Step ${i + 1}`}
                rows={3}
              />
              {recipe.methodSteps.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(i, 'methodSteps')}
                  className="ml-2 px-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField('methodSteps')}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Step
          </button>
        </div>

        {recipe.videoPath && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-2">Current Video</h4>
            <video controls className="w-full h-64 rounded-lg shadow">
              <source src={`http://localhost:8080${recipe.videoPath}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <div className="mb-8">
          <label className="block font-semibold text-gray-700 mb-2">
            {recipe.videoPath ? 'Replace Video' : 'Upload Video'} (optional)
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => navigate('/View_Learn_Recipe')}
            className="bg-gray-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition duration-200"
          >
            Update Recipe
          </button>
        </div>
      </form>
    </div>
  );
}