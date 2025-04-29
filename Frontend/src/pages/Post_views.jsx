import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

export default function Post_views() {
  const email = localStorage.getItem("userEmail");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/posts/user?email=${email}`).then(res => {
      setPosts(res.data);
    });
  }, [email]);

  const handleUpdate = (post) => {
    navigate('/Post_update', { state: { post } });
  };


  const handleDelete = async (postId) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;
  
    try {
      await axios.delete(`http://localhost:8080/api/posts/delete/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      alert("Failed to delete the post.");
      console.error(err);
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">My Posts</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="w-full h-80">
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
                      alt="post"
                      className="w-full h-80 object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="p-4">
              <p className="text-gray-800 font-semibold text-lg mb-2">{post.description}</p>
              <p className="text-gray-600 text-sm">❤️ {post.likes} Likes</p>
              <div className="flex justify-between mt-4">
  <button 
    onClick={() => handleUpdate(post)} 
    className="px-4 py-2 bg-blue-500 text-white rounded-full mr-2">
    Update
  </button>
  <button
    onClick={() => handleDelete(post.id)}
    className="px-4 py-2 bg-red-500 text-white rounded-full">
    Remove
  </button>
</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
