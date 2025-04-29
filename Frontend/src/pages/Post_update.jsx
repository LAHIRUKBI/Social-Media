import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Post_update() {
  const location = useLocation();
  const post = location.state?.post;
  const [description, setDescription] = useState(post?.description || '');
  const [imageUrls, setImageUrls] = useState(post?.imageUrls || []);
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImageFiles(files);
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('description', description);

    Array.from(imageFiles).forEach(file => {
      formData.append('images', file);
    });

    axios.put(`http://localhost:8080/api/posts/update/${post.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(response => {
        console.log("Post updated:", response.data);
        navigate('/Post_views');
      })
      .catch(error => {
        console.error("Error updating post:", error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 px-6">
      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10">Update Your Post</h2>
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-2">Post Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="5"
            placeholder="Write something about your post..."
          />
        </div>

        {/* New Images */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-2">Upload New Images (optional)</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-3 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            multiple
          />
        </div>

        {/* Current Images */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-2">Current Images</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Post Image ${index}`}
                className="w-full h-40 object-cover rounded-xl border border-gray-200 shadow"
              />
            ))}
          </div>
        </div>

        {/* Update Button */}
        <div className="text-center">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 px-8 rounded-full shadow-md"
          >
            Update Post
          </button>
        </div>
      </div>
    </div>
  );
}
