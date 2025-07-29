import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import GuestCredits from '../components/GuestCredits';
import { getGuestCreditsUsed, incrementGuestCredits } from '../utils/guestCredits';
import Navbar from '../components/Navbar';
import { IoLogOutOutline } from "react-icons/io5";


const MAX_GUEST_CREDITS = 5;

function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGuestLimitReached, setIsGuestLimitReached] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [guestCredits, setGuestCredits] = useState({ used: getGuestCreditsUsed(), max: MAX_GUEST_CREDITS });
  const [error, setError] = useState('');

  const isValidUrl = (url) => {
    const regex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/i;
    return regex.test(url);
  };

  const isLoggedIn = !!(token && user);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      try {
        const decoded = jwtDecode(localToken);
        setToken(localToken);
        setUser(decoded);
        localStorage.removeItem('guestCredits');
        setIsGuestLimitReached(false);
      } catch {
        localStorage.removeItem('token');
      }
    } else {
      const used = getGuestCreditsUsed();
      setGuestCredits({ used, max: MAX_GUEST_CREDITS });
      setIsGuestLimitReached(used >= MAX_GUEST_CREDITS);
    }
  }, []);

  useEffect(() => {
    if (token && user) {
      setIsGuestLimitReached(false);
    } else {
      const used = getGuestCreditsUsed();
      setIsGuestLimitReached(used >= MAX_GUEST_CREDITS);
    }
  }, [token, user]);

  const handleShorten = async () => {
    if (!originalUrl) {
      setError('URL cannot be empty');
      return;
    }

    if (!isValidUrl(originalUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    if (!isLoggedIn && getGuestCreditsUsed() >= MAX_GUEST_CREDITS) {
      setIsGuestLimitReached(true);
      return;
    }

    try {
      const res = await axios.post(
        'https://urlshortener-vwzz.onrender.com/api/shorten',
        { originalUrl },
        isLoggedIn ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );

      setShortUrl(res.data.shortUrl);
      setOriginalUrl('');
      setCopied(false);
      setError('');

      if (!isLoggedIn) {
        incrementGuestCredits();
        const used = getGuestCreditsUsed();
        setGuestCredits({ used, max: MAX_GUEST_CREDITS });
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Shorten failed');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    window.location.reload();
  };

  return (
    <div className=" bg-gray-50 flex flex-col items-center  py-10 ">
      <Navbar />
      <div className="bg-white p-6 mt-32 rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">🔗 URL Shortener</h1>
          {isLoggedIn && (
            <button onClick={handleLogout} className="text-sm text-red-600 text-xl">
            <IoLogOutOutline />

            </button>
          )}
        </div>

        {isLoggedIn && user && (
          <div className="flex items-center gap-2 mb-4">
            <img src={user.picture} alt="profile" className="w-8 h-8 rounded-full border" />
            <p className="text-sm text-gray-600">Welcome, {user.name}</p>
          </div>
        )}

        {/* Floating Label Input */}
        <div className="relative w-full mb-4">
          <input
            value={originalUrl}
            onChange={(e) => {
              setOriginalUrl(e.target.value);
              setError('');
            }}
            type="url"
            id="urlInput"
            placeholder="ex. https://www.example.com/products/electronics/laptops?brand=apple&model=macbook-pro-2024&ref=homepage-banner&utm_campaign=summer-sale&utm_medium=email"
            disabled={!isLoggedIn && isGuestLimitReached}
            className={`peer w-full px-3 py-2 border rounded focus:outline-none transition-all ${error
              ? 'border-red-500'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-400'
              }`}
          />

          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <button
          onClick={handleShorten}
          disabled={!isLoggedIn && isGuestLimitReached}
          className={`w-full p-2 text-white rounded transition ${!isLoggedIn && isGuestLimitReached
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          Shorten URL
        </button>

        {shortUrl && (
          <div className="mt-4 text-sm bg-gray-100 p-3 rounded flex items-center justify-between">
            <span className="text-green-700 truncate">{shortUrl}</span>
            <button
              onClick={handleCopy}
              className="ml-2 text-blue-600 underline text-xs"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}

        {!isLoggedIn && (
          <>
            <GuestCredits
              guestCredits={guestCredits}
              onCreditsExhausted={() => setIsGuestLimitReached(true)}
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Sign in with Google for unlimited usage:</p>
              <GoogleLogin
                onSuccess={async (response) => {
                  const googleToken = response.credential;
                  try {
                    const res = await axios.post('https://urlshortener-vwzz.onrender.com/api/auth/google-login', {
                      credential: googleToken,
                    });
                    const appJwt = res.data.token;
                    const decoded = jwtDecode(appJwt);
                    setToken(appJwt);
                    setUser(decoded);
                    localStorage.setItem('token', appJwt);
                    localStorage.removeItem('guestCredits');
                    setIsGuestLimitReached(false);
                    setTimeout(() => window.location.reload(), 300);
                  } catch {
                    alert('Login failed');
                  }
                }}
                onError={() => alert('Login failed')}
              />
            </div>
          </>
        )}

        {!isLoggedIn && isGuestLimitReached && (
          <div className="mt-4 text-yellow-700 bg-yellow-100 p-2 rounded text-center">
            🚫 Guest limit reached. Sign in to continue.
          </div>
        )}
        <div className='mt-2 text-center text-[11px] text-gray-500 text-right'>Made by Vaibhav Pari</div>
      </div>




    </div>
  );
}

export default Home;
