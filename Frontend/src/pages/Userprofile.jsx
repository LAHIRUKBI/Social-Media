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
      
      // Fetch user posts
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
          setCoverImage(res.data.coverImage);
        }
      } catch (err) {
        console.error("Error uploading cover image:", err);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden relative">

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md transition-all"
        >
          Logout
        </button>

        {/* Cover Photo */}
        <div className="h-64 bg-cover bg-center cursor-pointer" style={{ backgroundImage: `url(${coverImage})` }} onClick={handleCoverImageClick}>
          <input
            type="file"
            ref={coverImageInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleCoverImageChange}
          />
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start px-8 py-6">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white -mt-20 shadow-xl object-cover cursor-pointer"
              onClick={handleProfileImageClick}
            />
            <input
              type="file"
              ref={profileImageInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </div>
          <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-500 mt-1">Food Enthusiast | Home Cook</p>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p><span className="font-semibold">Email:</span> {email}</p>
              <p><span className="font-semibold">Followers:</span> 120</p>
              <p><span className="font-semibold">Posts:</span> {posts.length}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-8 mb-6">
          <button
            onClick={() => navigate("/Post_add")}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all shadow-md"
          >
            Add New Post
          </button>
          <button
            onClick={() => navigate("/Post_views")}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all shadow-md"
          >
            View Posts
          </button>
        </div>

        {/* Posts Section */}
        <div className="px-8 pb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Recent Posts</h3>
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map(post => (
                <div key={post.id} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
                  <div className="w-full h-64 mb-4">
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
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{post.description}</h4>
                  <p className="text-gray-600 text-sm">❤️ {post.likes} Likes</p>
{post.likedBy && post.likedBy.length > 0 && (
  <p className="text-xs text-gray-500 mt-1">
    Liked by: {post.likedBy.map((email, index) => (
      <span key={index}>
        {email.split('@')[0]}{index < post.likedBy.length - 1 ? ', ' : ''}
      </span>
    ))}
  </p>
)}

                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">You haven't posted anything yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}
