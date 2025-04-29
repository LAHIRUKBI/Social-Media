import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaPenAlt } from 'react-icons/fa';

export default function Post_add() {
  const email = localStorage.getItem("userEmail");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const navigate = useNavigate();

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
    images.forEach((img) => {
      formData.append("images", img);
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

      navigate('/Userprofile');
    } catch (error) {
      console.error("Error Details:", error.response || error.message);
      alert("Post creation failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-teal-600 text-white py-4 px-6 text-center">
          <h2 className="text-3xl font-bold">Share Your Creativity</h2>
          <p className="text-sm mt-1">Let the world see your recycled wonders 🌍</p>
        </div>

        <div className="px-6 py-8">
          <div className="mb-4 text-center">
            <p className="text-gray-700 text-sm">Posting as <span className="font-semibold">{email}</span></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Description Field */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaPenAlt className="text-teal-500" />
                Description
              </label>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                rows="4"
                placeholder="What's on your mind?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaImage className="text-teal-500" />
                Upload Images (Max 3)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full text-sm text-gray-700 py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {images.length > 3 && (
                <p className="text-red-500 text-sm mt-1">Only up to 3 images allowed</p>
              )}
            </div>

            {/* Preview Section */}
            {preview.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <div className="flex gap-3 overflow-x-auto">
                  {preview.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-teal-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
