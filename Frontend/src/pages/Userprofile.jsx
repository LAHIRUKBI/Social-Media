import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Userprofile() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const name = email ? email.split("@")[0] : "User";
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/150?img=3");
  const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop");
  const [posts, setPosts] = useState([]);
  const profileImageInputRef = useRef(null);
  const coverImageInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('posts');
  const [isCoverHovered, setIsCoverHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      {/* Main Profile Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden relative border border-white/20 backdrop-blur-sm transform transition-all hover:shadow-2xl">
        
        {/* Floating decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-200 rounded-full filter blur-3xl opacity-20 animate-float-delay"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-200 rounded-full filter blur-2xl opacity-20 animate-float-delay-2"></div>

        {/* Cover Photo with overlay */}
        <div 
          className="relative h-80 w-full overflow-hidden group"
          onMouseEnter={() => setIsCoverHovered(true)}
          onMouseLeave={() => setIsCoverHovered(false)}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
            style={{ 
              backgroundImage: `url(${coverImage})`,
              transform: isCoverHovered ? 'scale(1.05)' : 'scale(1)'
            }}
            onClick={handleCoverImageClick}
          >
            <div className={`absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 transition-opacity duration-500 ${isCoverHovered ? 'opacity-70' : 'opacity-50'}`}></div>
          </div>
          <input
            type="file"
            ref={coverImageInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleCoverImageChange}
          />
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
          
          {/* Cover photo change button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isCoverHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 flex items-center shadow-lg transform transition-transform hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Change Cover Photo
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg hover:shadow-xl transition-all z-10 flex items-center group"
          >
            <span className="mr-2">Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="relative px-8 pt-16 pb-8 bg-white">
          {/* Profile Picture */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 md:left-8 md:translate-x-0">
            <div 
              className="relative group cursor-pointer transition-all duration-300"
              onClick={handleProfileImageClick}
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
            >
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden transition-all duration-500 group-hover:shadow-lg">
                <img
                  src={profileImage}
                  alt="Profile"
                  className={`w-full h-full object-cover transition-transform duration-700 ${isProfileHovered ? 'scale-110' : 'scale-100'}`}
                />
              </div>
              <div className={`absolute inset-0 rounded-full bg-black/30 flex items-center justify-center transition-opacity duration-300 ${isProfileHovered ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-md transform transition-transform hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Change Photo
                </div>
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
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent inline-block">
                {name}
                <span className="ml-2 text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-full align-middle font-medium shadow-sm">
                  🌟 Master Chef
                </span>
              </h2>
              <p className="text-gray-500 mt-2 italic font-light">Food Enthusiast | Home Cook | Recipe Creator</p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                <StatBox 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  value={email}
                  color="indigo"
                />
                <StatBox 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  }
                  value="245 Followers"
                  color="purple"
                />
                <StatBox 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  }
                  value={`${posts.length} Posts`}
                  color="pink"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-8">
          <nav className="flex space-x-8">
            <TabButton 
              active={activeTab === 'posts'}
              onClick={() => setActiveTab('posts')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              }
              label="Posts"
            />
            <TabButton 
              active={activeTab === 'saved'}
              onClick={() => setActiveTab('saved')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              }
              label="Saved"
            />
            <TabButton 
              active={activeTab === 'liked'}
              onClick={() => setActiveTab('liked')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              label="Liked"
            />
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-8 py-6 bg-gradient-to-r from-purple-50 to-indigo-50">
          <ActionButton 
            onClick={() => navigate("/Post_add")}
            gradientFrom="from-green-500"
            gradientTo="to-teal-500"
            hoverFrom="from-green-600"
            hoverTo="to-teal-600"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
            label="Add New Post"
          />
          <ActionButton 
            onClick={() => navigate("/Post_views")}
            gradientFrom="from-blue-500"
            gradientTo="to-indigo-500"
            hoverFrom="from-blue-600"
            hoverTo="to-indigo-600"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }
            label="View All Posts"
          />
        </div>

        {/* Posts Section */}
        <div className="px-6 pb-10">
          {activeTab === 'posts' && (
            <>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Your Culinary Creations
              </h3>
              
              {posts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <EmptyState 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                  title="No Posts Yet"
                  description="Share your first culinary creation with the community!"
                  buttonText="Create Your First Post"
                  onClick={() => navigate("/Post_add")}
                  gradientFrom="from-purple-500"
                  gradientTo="to-indigo-500"
                />
              )}
            </>
          )}

          {activeTab === 'saved' && (
            <EmptyState 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              }
              title="No Saved Posts"
              description="Save your favorite recipes to find them easily later!"
            />
          )}

          {activeTab === 'liked' && (
            <EmptyState 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              title="No Liked Posts"
              description="Like some recipes to see them here!"
            />
          )}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 8s ease-in-out infinite 2s;
        }
        .animate-float-delay-2 {
          animation: float 8s ease-in-out infinite 4s;
        }
      `}</style>
    </div>
  );
}

// Reusable Components

const StatBox = ({ icon, value, color }) => {
  const colorClasses = {
    indigo: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600',
    purple: 'bg-purple-50 hover:bg-purple-100 text-purple-600',
    pink: 'bg-pink-50 hover:bg-pink-100 text-pink-600'
  };

  return (
    <div className={`px-4 py-2 rounded-full flex items-center transition-colors ${colorClasses[color]}`}>
      <span className={`bg-${color}-100 p-2 rounded-full mr-2`}>
        {icon}
      </span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-1 font-medium text-sm border-b-2 transition-all duration-300 flex items-center ${active ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
    >
      <span className={`flex items-center ${active ? 'text-purple-500' : 'text-gray-400'}`}>
        <span className="h-5 w-5 mr-2">
          {React.cloneElement(icon, { className: `h-full w-full ${active ? 'text-purple-500' : 'text-gray-400'}` })}
        </span>
        {label}
      </span>
    </button>
  );
};

const ActionButton = ({ onClick, gradientFrom, gradientTo, hoverFrom, hoverTo, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden group bg-gradient-to-r text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
    >
      <span className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} group-hover:opacity-0 transition-opacity duration-300`}></span>
      <span className={`absolute inset-0 bg-gradient-to-r ${hoverFrom} ${hoverTo} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></span>
      <span className="relative z-10 flex items-center">
        <span className="h-5 w-5 mr-2">
          {React.cloneElement(icon, { className: "h-full w-full text-white group-hover:rotate-90 transition-transform" })}
        </span>
        {label}
      </span>
    </button>
  );
};

const PostCard = ({ post }) => {
  return (
    <div className="bg-white group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-purple-100">
      {/* Post Image Carousel */}
      <div className="w-full h-60 overflow-hidden relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          className="h-full"
        >
          {post.imageUrls.map((url, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={url}
                alt="Post"
                className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-105"
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
  );
};

const EmptyState = ({ icon, title, description, buttonText, onClick, gradientFrom, gradientTo }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-12 text-center">
      <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-6 animate-bounce">
        <div className="h-12 w-12 text-purple-500">
          {React.cloneElement(icon, { className: "h-full w-full" })}
        </div>
      </div>
      <h4 className="text-xl font-semibold text-gray-700 mb-2">{title}</h4>
      <p className="text-gray-500 mb-6">{description}</p>
      {buttonText && onClick && (
        <button
          onClick={onClick}
          className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:from-purple-600 hover:to-indigo-600 text-white font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};