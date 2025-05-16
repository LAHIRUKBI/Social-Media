import React from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleButton({ onSuccess, onError }) {
  const handleClick = async () => {
    try {
      // Simulate a successful login. Replace with actual Google login logic.
      // You can integrate Google Auth here using Firebase or OAuth2.
      const resultMessage = "Google login successful!";
      onSuccess(resultMessage);
    } catch (error) {
      onError("Google login failed.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-white text-gray-800 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 active:scale-95"
    >
      <FcGoogle className="text-2xl" />
      <span>Continue with Google</span>
    </button>
  );
}
