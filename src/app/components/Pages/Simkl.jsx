'use client';
import React from 'react';

export default function Simkl() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SIMKL_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SIMKL_REDIRECT_URI;
    const authUrl = `https://simkl.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg"
        onClick={handleLogin}
      >
        Login with Simkl
      </button>
    </div>
  );
}
