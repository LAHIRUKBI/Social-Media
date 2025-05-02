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

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/learn/${id}`, recipe);
      alert('Recipe updated!');
      navigate('/View_Learn_Recipe');
    } catch (err) {
      console.error('Error updating recipe:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Update Recipe</h2>

      <input
        name="recipeName"
        value={recipe.recipeName}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        placeholder="Recipe Name"
      />

      <h4 className="font-semibold mb-2">Ingredients</h4>
      {recipe.ingredients.map((ing, i) => (
        <input
          key={i}
          value={ing}
          onChange={(e) => handleArrayChange(i, e.target.value, 'ingredients')}
          className="w-full p-2 border rounded mb-2"
        />
      ))}

      <h4 className="font-semibold mt-4 mb-2">Method Steps</h4>
      {recipe.methodSteps.map((step, i) => (
        <input
          key={i}
          value={step}
          onChange={(e) => handleArrayChange(i, e.target.value, 'methodSteps')}
          className="w-full p-2 border rounded mb-2"
        />
      ))}

      <button
        onClick={handleUpdate}
        className="bg-green-600 text-white px-4 py-2 rounded mt-6 hover:bg-green-700 transition"
      >
        Update Recipe
      </button>
    </div>
  );
}
