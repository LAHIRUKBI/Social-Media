import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Update_Learn_Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    recipeName: '',
    ingredients: [],
    methodSteps: [],
    videoPath: ''
  });
  const [newVideo, setNewVideo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/learn`)
      .then(res => {
        const target = res.data.find(r => r.id === id);
        if (target) setRecipe(target);
      })
      .catch(err => console.error('Error fetching recipe:', err));
  }, [id]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, value, field) => {
    const updated = [...recipe[field]];
    updated[index] = value;
    setRecipe({ ...recipe, [field]: updated });
  };

  const handleVideoChange = (e) => {
    setNewVideo(e.target.files[0]);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('recipeName', recipe.recipeName);
    formData.append('ingredients', JSON.stringify(recipe.ingredients));
    formData.append('methodSteps', JSON.stringify(recipe.methodSteps));

    if (newVideo) {
      formData.append('video', newVideo);
    } else {
      formData.append('videoPath', recipe.videoPath);
    }

    try {
      await axios.put(`http://localhost:8080/learn/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Recipe updated!');
      navigate('/View_Learn_Recipe');
    } catch (err) {
      console.error('Error updating recipe:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white shadow-lg rounded-lg mt-10 mb-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Update Recipe</h2>

      <div className="mb-6">
        <label className="block font-semibold mb-1 text-gray-700">Recipe Name</label>
        <input
          name="recipeName"
          value={recipe.recipeName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter recipe name"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-gray-700">Ingredients</label>
        {recipe.ingredients.map((ing, i) => (
          <input
            key={i}
            value={ing}
            onChange={(e) => handleArrayChange(i, e.target.value, 'ingredients')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={`Ingredient ${i + 1}`}
          />
        ))}
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-gray-700">Method Steps</label>
        {recipe.methodSteps.map((step, i) => (
          <input
            key={i}
            value={step}
            onChange={(e) => handleArrayChange(i, e.target.value, 'methodSteps')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={`Step ${i + 1}`}
          />
        ))}
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
        <label className="block font-semibold text-gray-700 mb-2">Upload New Video (optional)</label>
        <input
          type="file"
          accept="video/mp4"
          onChange={handleVideoChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition duration-200"
        >
          Update Recipe
        </button>
      </div>
    </div>
  );
}
