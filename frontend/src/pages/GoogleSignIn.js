import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function SignIn() {
  const handleSuccess = async (response) => {
    const token = response.credential;
    localStorage.setItem('token', token);
    localStorage.removeItem('guestCredits');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold mb-2">Sign in with Google</h2>
        <GoogleLogin onSuccess={handleSuccess} onError={() => alert('Login Failed')} />
      </div>
    </div>
  );
}

export default SignIn;