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

  // Handle file selection
  const handleImageChange = (event) => {
    const files = event.target.files;
    setImageFiles(files);
  };

  // Handle form submission
  // Handle form submission
const handleUpdate = () => {
    const formData = new FormData();
    formData.append('description', description);
  
    // Append selected image files
    Array.from(imageFiles).forEach(file => {
      formData.append('images', file);
    });
  
    // Send PUT request to update the post
    axios.put(`http://localhost:8080/api/posts/update/${post.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for multipart form data
      }
    })
    .then(response => {
      console.log("Post updated:", response.data);
      navigate('/Post_views');  // Navigate back to the post views page
    })
    .catch(error => {
      console.error("Error updating post:", error);
    });
  };
  
  

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Update Post</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
            rows="5"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select New Images (optional)</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg"
            multiple
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Current Images</label>
          <div className="flex space-x-4">
            {imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Post Image ${index}`} className="w-32 h-32 object-cover rounded-lg" />
            ))}
          </div>
        </div>

        <button 
          onClick={handleUpdate} 
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">
          Update Post
        </button>
      </div>
    </div>
  );
}
