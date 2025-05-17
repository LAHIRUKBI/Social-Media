import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function GoogleButton({ onSuccess, onError }) {
    const handleGoogleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            try {
                // Exchange code for tokens with your backend
                const tokenResponse = await axios.post(
                    "http://localhost:8080/api/auth/google/login",
                    { code: codeResponse.code },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );

                if (tokenResponse.data?.success) {
                    onSuccess(tokenResponse.data);
                } else {
                    onError(tokenResponse.data?.error || "Authentication failed");
                }
            } catch (error) {
                let errorMessage = "Google login failed";
                if (error.response) {
                    errorMessage = error.response.data?.error || 
                                 error.response.data?.message || 
                                 error.response.statusText;
                } else if (error.request) {
                    errorMessage = "No response from server";
                } else {
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