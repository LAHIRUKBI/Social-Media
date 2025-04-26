import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Post_views() {
  const email = localStorage.getItem("userEmail");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/posts/user?email=${email}`).then(res => {
      setPosts(res.data);
    });
  }, [email]);

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
