import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Post_views() {
  const email = localStorage.getItem("userEmail");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/posts/user?email=${email}`).then(res => {
      setPosts(res.data);
    });
  }, [email]);

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">My Posts</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white shadow rounded-lg p-4">
            <div className="mb-2 text-gray-800 font-semibold">{post.description}</div>
            <div className="flex gap-2">
              {post.imageUrls.map((url, idx) => (
                <img key={idx} src={url} alt="post" className="w-24 h-24 rounded object-cover" />
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-600">❤️ {post.likes} Likes</p>
          </div>
        ))}
      </div>
    </div>
  );
}
