import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function GoogleButton({ onSuccess, onError }) {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
        try {
            console.log("1. Google token received:", tokenResponse);
            
            // Step 1: Get user info from Google
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { 
                    headers: { 
                        Authorization: `Bearer ${tokenResponse.access_token}` 
                    } 
                }
            );
            console.log("2. Google user info:", userInfo.data);
            
            // Step 2: Send to backend
            const backendResponse = await axios.post(
                "http://localhost:8080/api/auth/google/login", 
                {
                    idToken: tokenResponse.access_token,
                    email: userInfo.data.email,
                    name: userInfo.data.name,
                    picture: userInfo.data.picture
                }, 
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log("3. Backend response:", backendResponse.data);
            
            onSuccess(backendResponse);
        } catch (error) {
            console.error("Full error details:", {
                message: error.message,
                response: error.response,
                stack: error.stack
            });
            onError(error.response?.data || "Google login failed. Please try again.");
        }
    },
    onError: (error) => {
        console.error("Google OAuth error:", error);
        onError("Failed to connect with Google. Please try again.");
    }
});

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-white text-gray-800 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 active:scale-95"
    >
      <FcGoogle className="text-2xl" />
      <span>Continue with Google</span>
    </button>
  );
}