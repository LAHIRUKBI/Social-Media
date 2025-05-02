import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook from react-router-dom

export default function Add_New_Recipes() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQty, setIngredientQty] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [methodSteps, setMethodSteps] = useState(['']);
  const [videoFile, setVideoFile] = useState(null);

  // Initialize the navigate function for navigation
  const navigate = useNavigate();

  const addIngredient = () => {
    if (ingredientName && ingredientQty) {
      setIngredients([...ingredients, `${ingredientQty} ${ingredientName}`]);
      setIngredientName('');
      setIngredientQty('');
    }
  };

  const addMethodStep = (index, value) => {
    const updatedSteps = [...methodSteps];
    updatedSteps[index] = value;
    setMethodSteps(updatedSteps);
  };

  const addNewStep = () => {
    setMethodSteps([...methodSteps, '']);
  };

  const handleVideoUpload = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('recipeName', recipeName);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('methodSteps', JSON.stringify(methodSteps));
    if (videoFile) formData.append('video', videoFile);
  
    // Debugging the formData content before sending
    console.log('Form Data:', formData);
  
    try {
      const response = await axios.post('http://localhost:8080/learn/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        alert(response.data); // Success message
      } else {
        alert('Failed to add recipe. ' + (response.data || 'Unknown error'));
      }
  
      // Reset form fields after successful submission
      setRecipeName('');
      setIngredients([]);
      setMethodSteps(['']);
      setVideoFile(null);
    } catch (err) {
      console.error("Error:", err);
      alert('Failed to add recipe. ' + (err.response?.data || 'Unknown error'));
    }
  };

  // Handle navigation to the "View_Learn_Recipe" page
  const handleViewRecipe = () => {
    navigate('/View_Learn_Recipe');
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
      
      {/* Top Bar: Title + View Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Add New Recipe</h2>
        <button
          onClick={handleViewRecipe}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded transition"
        >
          View Recipes
        </button>
      </div>
  
      {/* Recipe Name */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Recipe Name</label>
        <input
          type="text"
          placeholder="Enter recipe name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
  
      {/* Ingredients Section */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Ingredients</label>
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            placeholder="Ingredient Name"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Quantity"
            value={ingredientQty}
            onChange={(e) => setIngredientQty(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none"
          />
          <button
            onClick={addIngredient}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded transition"
          >
            Add
          </button>
        </div>
        <ul className="list-disc list-inside text-gray-700">
          {ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
      </div>
  
      {/* Method Steps */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Method Steps</label>
        {methodSteps.map((step, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Step ${index + 1}`}
            value={step}
            onChange={(e) => addMethodStep(index, e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none"
          />
        ))}
        <button
          onClick={addNewStep}
          className="text-sm text-teal-600 hover:text-teal-800 transition"
        >
          + Add Another Step
        </button>
      </div>
  
      {/* Video Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Upload 30 sec video</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="text-gray-600"
        />
      </div>
  
      {/* Submit Button */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
        >
          Add To Learns
        </button>
      </div>
    </div>
  );
  
}
