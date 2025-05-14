import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Learning_add() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [instructions, setInstructions] = useState(['']);
  const [image, setImage] = useState(null);
  const [cookingTime, setCookingTime] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');

  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out empty ingredients and instructions
    const filteredIngredients = ingredients.filter(ing => ing.name.trim() !== '');
    const filteredInstructions = instructions.filter(inst => inst.trim() !== '');
    
    if (filteredIngredients.length === 0 || filteredInstructions.length === 0) {
      alert('Please add at least one ingredient and one instruction');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', JSON.stringify(filteredIngredients));
    formData.append('instructions', JSON.stringify(filteredInstructions));
    formData.append('email', userEmail);
    formData.append('cookingTime', cookingTime);
    formData.append('difficulty', difficulty);
    
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:8080/api/recipes/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Recipe submitted successfully!');
      navigate('/Learning_Home');
    } catch (error) {
      console.error('Error response:', error.response);
      alert('Failed to submit recipe: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white py-10 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">🍳 Share Your Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Recipe Title*</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
              placeholder="e.g., Classic Chocolate Cake"
              required 
            />
          </div>

          {/* Cooking Time and Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Cooking Time</label>
              <input 
                type="text" 
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
                placeholder="e.g., 30 minutes"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Ingredients*</label>
            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
                    placeholder="Ingredient name"
                  />
                  <input
                    type="text"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                    className="w-1/3 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
                    placeholder="Quantity"
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="mt-2 flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Another Ingredient
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Instructions*</label>
            <div className="space-y-3">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-gray-500 mt-2">{index + 1}.</span>
                  <div className="flex-1 flex gap-3">
                    <textarea
                      value={instruction}
                      onChange={(e) => handleInstructionChange(index, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
                      placeholder={`Step ${index + 1}`}
                      rows="2"
                    />
                    {instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition self-start mt-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addInstruction}
                className="mt-2 flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Another Step
              </button>
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Upload Image</label>
            <div className="flex items-center gap-4">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full text-sm text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
              />
              {image && (
                <div className="relative">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt="Preview" 
                    className="h-16 w-16 object-cover rounded-md border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}