import React, { useState } from 'react';
import axios from 'axios';

export default function Post_add() {
  const email = localStorage.getItem("userEmail");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImages(files);
    setPreview(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("email", email);
    formData.append("description", description);
    images.forEach((img, index) => {
        formData.append("images", img);
        console.log("Appending image:", img.name);
    });
    
    

    try {
      const res = await axios.post("http://localhost:8080/api/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Post created!");
    } catch (error) {
      console.error(error);
      alert("Post creation failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border rounded mb-4"
          rows="4"
          placeholder="What's on your mind?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mb-4"
        />
        <div className="flex gap-2 mb-4">
          {preview.map((src, index) => (
            <img key={index} src={src} alt="preview" className="w-24 h-24 object-cover rounded" />
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
