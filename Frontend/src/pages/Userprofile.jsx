import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Userprofile() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const name = email ? email.split("@")[0] : "User";

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // You can fetch the profile image from the backend if it's already saved
    // Example: fetchProfileImage();
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Remove all stored data
    navigate("/Login"); // Navigate to login page
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Preview the image locally
      setProfileImage(imageUrl); // Set image preview (you can send this to the backend)
      
      // Create a FormData object to send the file to the backend
      const formData = new FormData();
      formData.append("email", email);
      formData.append("profileImage", imageUrl);

      // Send the image to the backend (make sure to implement this endpoint)
      fetch("http://localhost:8080/api/users/updateProfileImage", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle successful image update (e.g., show a success message)
          console.log("Profile image updated:", data);
        })
        .catch((error) => {
          console.error("Error updating profile image:", error);
        });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden relative">

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

        {/* Cover Photo */}
        <div className="h-56 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e')]"></div>

        {/* Profile Info */}
        <div className="p-6 flex flex-col md:flex-row items-center md:items-start">
          <img
            src={profileImage || "https://i.pravatar.cc/150?img=3"} // Default image if no profile image
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white -mt-16 shadow-lg"
          />
          <div className="ml-0 md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-500">Food Enthusiast | Home Cook</p>
            <div className="mt-4 flex flex-col gap-2">
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Followers:</strong> 120</p>
              <p><strong>Posts:</strong> 35</p>
            </div>
          </div>
        </div>

        {/* Profile Image Upload */}
        <div className="p-6">
          <label className="block text-gray-700">Upload Profile Image:</label>
          <input 
            type="file" 
            onChange={handleImageChange} 
            className="mt-2 text-sm text-gray-500"
          />
        </div>

        {/* Add and View Post Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => navigate("/Post_add")}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
          >
            ➕ Add New Post
          </button>

          <button
            onClick={() => navigate("/Post_views")}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
          >
            👀 View Posts
          </button>
        </div>

        {/* Posts section */}
        <div className="p-6 border-t mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Posts</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-1">My Spaghetti Recipe 🍝</h4>
              <p className="text-sm text-gray-600">Just tried out this new recipe and it turned out amazing!</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h4 className="font-bold text-gray-800 mb-1">Grill Night 🔥</h4>
              <p className="text-sm text-gray-600">Had a great time grilling with the fam!</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
