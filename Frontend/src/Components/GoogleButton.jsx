import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function GoogleButton({ onSuccess, onError }) {
const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
        try {
            // Get user info from Google
            const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { 
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                    'Accept': 'application/json'
                },
                timeout: 5000
            });

            // Send to backend
            const backendResponse = await axios.post(
                "http://localhost:8080/api/auth/google/login", 
                {
                    idToken: tokenResponse.access_token,
                    email: userInfo.data.email,
                    name: userInfo.data.name,
                    picture: userInfo.data.picture
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    timeout: 8000
                }
            );

            if (backendResponse.data?.success) {
                onSuccess(backendResponse.data);
            } else {
                onError(backendResponse.data?.error || "Authentication failed");
            }
        } catch (error) {
            let errorMessage = "Google login failed";
            
            if (error.response) {
                // Server responded with error status
                errorMessage = error.response.data?.error || 
                             error.response.data?.message || 
                             error.response.statusText;
                console.error("Server error:", error.response.data);
            } else if (error.request) {
                // Request was made but no response
                errorMessage = "No response from server";
            } else {
                // Other errors
                errorMessage = error.message;
            }
            
            onError(errorMessage);
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