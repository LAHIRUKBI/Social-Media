import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Learning_add() {
  const [title, setTitle] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructionStep, setInstructionStep] = useState('');
  const [instructionTime, setInstructionTime] = useState('');
  const [instructions, setInstructions] = useState([]);
  const [image, setImage] = useState(null);

  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  const handleAddIngredient = () => {
    if (ingredientName.trim() && ingredientAmount.trim()) {
      setIngredients([...ingredients, {
        name: ingredientName.trim(),
        amount: ingredientAmount.trim()
      }]);
      setIngredientName('');
      setIngredientAmount('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleAddInstruction = () => {
    if (instructionStep.trim()) {
      setInstructions([...instructions, {
        step: instructionStep.trim(),
        time: instructionTime.trim()
      }]);
      setInstructionStep('');
      setInstructionTime('');
    }
  };

  const handleRemoveInstruction = (index) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (ingredients.length === 0 || instructions.length === 0) {
      alert('Please add at least one ingredient and one instruction');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('instructions', JSON.stringify(instructions));
    formData.append('email', userEmail);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/recipes/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Recipe submitted successfully!');
      setTitle('');
      setIngredients([]);
      setInstructions([]);
      setImage(null);
      navigate('/Learning_Home');
    } catch (error) {
      console.error('Error response:', error.response);
      alert('Failed to submit recipe: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">📖 Share Your Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Recipe Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
              placeholder="e.g., Classic Chocolate Cake"
              required 
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Ingredients</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
                placeholder="Ingredient name"
              />
              <input
                type="text"
                value={ingredientAmount}
                onChange={(e) => setIngredientAmount(e.target.value)}
                className="w-1/3 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
                placeholder="Amount (e.g., 1 cup)"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-sm"
              >
                Add
              </button>
            </div>
            
            {ingredients.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <h4 className="text-xs font-semibold text-gray-500 mb-2">INGREDIENT LIST</h4>
                <ul className="space-y-2">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between items-center bg-white p-2 rounded-md shadow-xs">
                      <span className="text-sm">
                        <span className="font-medium">{ingredient.name}</span> - {ingredient.amount}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Instructions</label>
            <div className="flex flex-col gap-2 mb-2">
              <textarea
                value={instructionStep}
                onChange={(e) => setInstructionStep(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
                placeholder="Instruction step"
                rows="2"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={instructionTime}
                  onChange={(e) => setInstructionTime(e.target.value)}
                  className="w-1/3 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
                  placeholder="Time (optional)"
                />
                <button
                  type="button"
                  onClick={handleAddInstruction}
                  className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-sm"
                >
                  Add Step
                </button>
              </div>
            </div>
            
            {instructions.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <h4 className="text-xs font-semibold text-gray-500 mb-2">INSTRUCTION STEPS</h4>
                <ol className="space-y-3">
                  {instructions.map((instruction, index) => (
                    <li key={index} className="bg-white p-3 rounded-md shadow-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium text-teal-600 mr-2">{index + 1}.</span>
                          <span className="text-sm">{instruction.step}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveInstruction(index)}
                          className="text-red-500 hover:text-red-700 text-sm ml-2"
                        >
                          ✕
                        </button>
                      </div>
                      {instruction.time && (
                        <div className="mt-1 ml-6 text-xs text-gray-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {instruction.time}
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Upload Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-sm text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-3 rounded-lg transition-all duration-300 shadow-md"
              disabled={ingredients.length === 0 || instructions.length === 0}
            >
              📤 Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}