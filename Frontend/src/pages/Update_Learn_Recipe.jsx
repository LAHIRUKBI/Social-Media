import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Update_Learn_Recipe() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe: initialRecipe } = location.state || {};
  
  const [recipe, setRecipe] = useState({
    id: '',
    title: '',
    ingredients: [],
    instructions: [],
    imageUrl: '',
    cookingTime: '',
    difficulty: ''
  });
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (initialRecipe) {
      // Parse the ingredients and instructions from the initial recipe
      const parsedIngredients = tryParseJSON(initialRecipe.ingredients) || [{ name: '', quantity: '' }];
      const parsedInstructions = tryParseJSON(initialRecipe.instructions) || [''];
      
      setRecipe({
        id: initialRecipe.id || initialRecipe._id,
        title: initialRecipe.title,
        ingredients: Array.isArray(parsedIngredients) ? parsedIngredients : [{ name: '', quantity: '' }],
        instructions: Array.isArray(parsedInstructions) ? parsedInstructions : [''],
        imageUrl: initialRecipe.imageUrl || '',
        cookingTime: initialRecipe.cookingTime || '',
        difficulty: initialRecipe.difficulty || ''
      });
      
      if (initialRecipe.imageUrl) {
        setPreviewImage(`http://localhost:8080${initialRecipe.imageUrl}`);
      }
    }
  }, [initialRecipe]);

  const tryParseJSON = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return jsonString;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipe.ingredients];
    if (!updatedIngredients[index]) {
      updatedIngredients[index] = { name: '', quantity: '' };
    }
    updatedIngredients[index][field] = value;
    setRecipe(prev => ({ ...prev, ingredients: updatedIngredients }));
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...recipe.instructions];
    updatedInstructions[index] = value;
    setRecipe(prev => ({ ...prev, instructions: updatedInstructions }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '' }]
    }));
  };

  const removeIngredient = (index) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const addInstruction = () => {
    setRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const removeInstruction = (index) => {
    setRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', recipe.title);
    formData.append('ingredients', JSON.stringify(recipe.ingredients));
    formData.append('instructions', JSON.stringify(recipe.instructions));
    formData.append('cookingTime', recipe.cookingTime);
    formData.append('difficulty', recipe.difficulty);

    if (newImage) {
      formData.append('image', newImage);
    } else if (recipe.imageUrl) {
      formData.append('imageUrl', recipe.imageUrl);
    }

    try {
      await axios.put(`http://localhost:8080/api/recipes/${recipe.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Recipe updated successfully!');
      navigate('/Learning_share_recipe');
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Failed to update recipe');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden p-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-600 font-serif">Update Recipe</h2>

        {/* Recipe Title */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Recipe Title</label>
          <input
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter recipe title"
          />
        </div>

        {/* Cooking Time and Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Cooking Time</label>
            <input
              name="cookingTime"
              value={recipe.cookingTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., 30 minutes"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Difficulty</label>
            <select
              name="difficulty"
              value={recipe.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-6 bg-amber-50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <label className="block font-semibold text-gray-700">Ingredients</label>
            <button
              type="button"
              onClick={addIngredient}
              className="bg-amber-500 text-white px-3 py-1 rounded-md text-sm hover:bg-amber-600"
            >
              Add Ingredient
            </button>
          </div>
          
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2 items-end">
              <div className="md:col-span-2">
                <label className="text-xs text-gray-500">Ingredient Name</label>
                <input
                  value={ingredient.name || ''}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="e.g., Flour"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-gray-500">Quantity</label>
                <input
                  value={ingredient.quantity || ''}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="e.g., 1 cup"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="w-full bg-red-100 text-red-600 px-3 py-2 rounded-md text-sm hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mb-6 bg-orange-50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <label className="block font-semibold text-gray-700">Instructions</label>
            <button
              type="button"
              onClick={addInstruction}
              className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm hover:bg-orange-600"
            >
              Add Step
            </button>
          </div>
          
          {recipe.instructions.map((step, index) => (
            <div key={index} className="mb-3">
              <div className="flex items-start gap-2">
                <span className="bg-orange-500 text-white font-medium rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0 text-sm">
                  {index + 1}
                </span>
                <div className="flex-grow">
                  <textarea
                    value={step}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder={`Describe step ${index + 1}`}
                    rows="3"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">Recipe Image</label>
          {previewImage && (
            <div className="mb-3">
              <img 
                src={previewImage} 
                alt="Recipe preview" 
                className="h-48 w-full object-cover rounded-lg shadow"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate('/Learning_share_recipe')}
            className="bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Update Recipe
          </button>
        </div>
      </div>
    </div>
  );
}