import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Post_add() {
  const email = localStorage.getItem("userEmail");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  
  const navigate = useNavigate(); // Initialize the navigate function

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImages(files);
    setPreview(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length > 3) {
      alert("Only up to 3 images allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("description", description);
    images.forEach((img, index) => {
      formData.append("images", img); // Ensure each image is appended with the key "images"
    });

    try {
      const res = await axios.post("http://localhost:8080/api/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Response:", res.data);
      alert("Post created!");

      setDescription("");
      setImages([]);
      setPreview([]);

      // Navigate to /Userprofile page after successful post creation
      navigate('/Userprofile');
    } catch (error) {
      console.error("Error Details:", error.response || error.message);
      alert("Post creation failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create a Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description Textarea */}
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          rows="4"
          placeholder="What's on your mind?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        {/* Image Upload */}
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full text-sm text-gray-700 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {images.length > 3 && <p className="text-red-500 text-sm absolute top-12 left-0">Only up to 3 images allowed</p>}
        </div>

        {/* Image Previews */}
        <div className="flex gap-2 overflow-x-auto mb-4">
          {preview.map((src, index) => (
            <img key={index} src={src} alt="preview" className="w-20 h-20 object-cover rounded-md" />
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}
