import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function GoogleButton({ onSuccess, onError }) {
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                console.log("Google token received:", tokenResponse);
                
                // First get user info from Google
                const userInfo = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`
                        }
                    }
                );

                console.log("Google user info:", userInfo.data);

                // Then send to your backend
                const backendResponse = await axios.post(
                    "http://localhost:8080/api/auth/google/login",
                    {
                        accessToken: tokenResponse.access_token,
                        email: userInfo.data.email,
                        name: userInfo.data.name,
                        picture: userInfo.data.picture
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                console.log("Backend response:", backendResponse.data);
                
                if (backendResponse.data?.success) {
                    onSuccess({
                        success: true,
                        user: backendResponse.data.user
                    });
                } else {
                    onError(backendResponse.data?.error || "Authentication failed");
                }
            } catch (error) {
                console.error("Full error:", error);
                let errorMessage = "Google login failed";
                if (error.response) {
                    console.error("Error response:", error.response.data);
                    errorMessage = error.response.data?.error || 
                                 error.response.data?.message || 
                                 error.response.statusText;
                } else if (error.request) {
                    console.error("No response:", error.request);
                    errorMessage = "No response from server";
                } else {
                    console.error("Request error:", error.message);
                    errorMessage = error.message;
                }
                onError(errorMessage);
            }
        },
        onError: (error) => {
            console.error("Google login error:", error);
            onError("Failed to connect with Google");
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