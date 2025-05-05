import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Userprofile() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const name = email ? email.split("@")[0] : "User";
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/150?img=3");
  const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e");
  const [posts, setPosts] = useState([]);
  const profileImageInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:8080/api/users/${email}`)
        .then(res => {
          if (res.data.profileImage) {
            setProfileImage(`http://localhost:8080/${res.data.profileImage}`);
          }
        })
        .catch(err => console.error("Error fetching user:", err));

      axios.get(`http://localhost:8080/api/posts/user?email=${email}`)
        .then(res => {
          setPosts(res.data);
        })
        .catch(err => console.error("Error fetching posts:", err));
    }
  }, [email]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  const handleProfileImageClick = () => {
    profileImageInputRef.current.click();
  };

  const handleCoverImageClick = () => {
    coverImageInputRef.current.click();
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.put(`http://localhost:8080/api/users/upload/${email}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data.profileImage) {
          setProfileImage(`http://localhost:8080/api/users/images/${res.data.profileImage}`);
        }
      } catch (err) {
        console.error("Error uploading profile image:", err);
      }
    }
  };

  const handleCoverImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.put(`http://localhost:8080/api/users/uploadCover/${email}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data.coverImage) {
          setCoverImage(`http://localhost:8080/api/users/images/${res.data.coverImage}`);
        }
      } catch (err) {
        console.error("Error uploading cover image:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4">
      {/* Main Profile Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-white/20 backdrop-blur-sm">
        {/* Floating decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-200 rounded-full filter blur-3xl opacity-20"></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg hover:shadow-xl transition-all z-10"
        >
          Logout
        </button>

        {/* Cover Photo with overlay */}
        <div className="relative h-80 w-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-500 hover:scale-105"
            style={{ backgroundImage: `url(${coverImage})` }}
            onClick={handleCoverImageClick}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30"></div>
          </div>
          <input
            type="file"
            ref={coverImageInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleCoverImageChange}
          />
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* Profile Info Section */}
        <div className="relative px-8 pt-16 pb-8 bg-white">
          {/* Profile Picture */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 md:left-8 md:translate-x-0">
            <div 
              className="relative group cursor-pointer"
              onClick={handleProfileImageClick}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              />
              <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white font-medium">Change</span>
              </div>
              <input
                type="file"
                ref={profileImageInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </div>
          </div>

          {/* User Details */}
          <div className="mt-8 md:mt-0 md:ml-40 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {name}
            </h2>
            <p className="text-gray-500 mt-2 italic">Food Enthusiast | Home Cook</p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
              <div className="bg-indigo-50 px-4 py-2 rounded-full flex items-center">
                <span className="bg-indigo-100 p-2 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="text-gray-700">{email}</span>
              </div>
              <div className="bg-purple-50 px-4 py-2 rounded-full flex items-center">
                <span className="bg-purple-100 p-2 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <span className="text-gray-700">120 Followers</span>
              </div>
              <div className="bg-pink-50 px-4 py-2 rounded-full flex items-center">
                <span className="bg-pink-100 p-2 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </span>
                <span className="text-gray-700">{posts.length} Posts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-8 pb-8">
          <button
            onClick={() => navigate("/Post_add")}
            className="relative overflow-hidden group bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Post
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </button>
          <button
            onClick={() => navigate("/Post_views")}
            className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View All Posts
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </button>
        </div>

        {/* Posts Section */}
        <div className="px-6 pb-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Your Recent Creations
          </h3>
          
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <div key={post.id} className="bg-white group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-purple-100">
                  {/* Post Image Carousel */}
                  <div className="w-full h-60 overflow-hidden relative">
                    <Swiper
                      modules={[Navigation, Pagination]}
                      navigation
                      pagination={{ clickable: true }}
                      className="h-full"
                    >
                      {post.imageUrls.map((url, idx) => (
                        <SwiperSlide key={idx}>
                          <img
                            src={url}
                            alt="Post"
                            className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  
                  {/* Post Content */}
                  <div className="p-5">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">{post.description}</h4>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-gray-600">{post.likes} Likes</span>
                      </div>
                      {post.likedBy && post.likedBy.length > 0 && (
                        <div className="text-xs text-gray-500">
                          Liked by {post.likedBy[0].split('@')[0]}
                          {post.likedBy.length > 1 && ` +${post.likedBy.length - 1} more`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-12 text-center">
              <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">No Posts Yet</h4>
              <p className="text-gray-500 mb-6">Share your first culinary creation with the community!</p>
              <button
                onClick={() => navigate("/Post_add")}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium px-6 py-2 rounded-full shadow-md transition-all"
              >
                Create Your First Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}