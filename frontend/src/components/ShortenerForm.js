import { useState } from 'react';
import axios from 'axios';

function ShortenerForm() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

        if (!originalUrl.trim()) {
            newErrors.originalUrl = 'URL is required';
        } else if (!urlRegex.test(originalUrl)) {
            newErrors.originalUrl = 'Enter a valid URL';
        }

        if (customAlias.length > 20) {
            newErrors.customAlias = 'Alias too long (max 20 characters)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await axios.post('https://urlshortener-vwzz.onrender.com/shorten', {
                originalUrl,
                customAlias,
            });
            setShortUrl(res.data.shortUrl);
            setOriginalUrl('');
            setCustomAlias('');
            setErrors({});
        } catch (err) {
            alert(err.response?.data?.error || 'Error shortening URL');
        }
    };

    return (
        <div className=" flex items-center justify-center bg-slate-100 px-4">
            <div className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-md py-5">
                <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
                    🔗 URL Shortener
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="url"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                                errors.originalUrl ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter long URL"
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                        />
                        {errors.originalUrl && (
                            <p className="text-red-500 text-sm mt-1">{errors.originalUrl}</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                                errors.customAlias ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Custom alias (optional)"
                            value={customAlias}
                            onChange={(e) => setCustomAlias(e.target.value)}
                        />
                        {errors.customAlias && (
                            <p className="text-red-500 text-sm mt-1">{errors.customAlias}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Shorten URL
                    </button>
                </form>

                {shortUrl && (
                    <div className="mt-6 text-center bg-green-100 p-4 rounded-lg">
                        <p className="text-green-700 font-medium">Short URL:</p>
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline break-words"
                        >
                            {shortUrl}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShortenerForm;
