import React, { useState } from 'react';
import axios from 'axios';

export default function Add_New_Recipes() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQty, setIngredientQty] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [methodSteps, setMethodSteps] = useState(['']);
  const [videoFile, setVideoFile] = useState(null);

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

    try {
      const response = await axios.post('http://localhost:8080/learn/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data);
      setRecipeName('');
      setIngredients([]);
      setMethodSteps(['']);
      setVideoFile(null);
    } catch (err) {
      console.error(err);
      alert('Failed to add recipe.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>

      <input
        type="text"
        placeholder="Recipe Name"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
        className="w-full border p-2 mb-4"
      />

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Ingredient Name"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Quantity"
          value={ingredientQty}
          onChange={(e) => setIngredientQty(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={addIngredient}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >Add</button>
      </div>

      <ul className="mb-4 list-disc list-inside">
        {ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Method Steps</label>
        {methodSteps.map((step, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Step ${index + 1}`}
            value={step}
            onChange={(e) => addMethodStep(index, e.target.value)}
            className="w-full border p-2 mb-2"
          />
        ))}
        <button onClick={addNewStep} className="text-sm text-teal-700">+ Add Step</button>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Upload 30 sec video:</label>
        <input type="file" accept="video/*" onChange={handleVideoUpload} />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >Add To Learn</button>
    </div>
  );
}
