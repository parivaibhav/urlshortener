import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function ShortenerForm() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [errors, setErrors] = useState({});
    const [copied, setCopied] = useState(false);

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
            setCopied(false);
        } catch (err) {
            alert(err.response?.data?.error || 'Error shortening URL');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="min-h-screen grid place-items-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4 py-10">
            <motion.div
                className="w-full max-w-md backdrop-blur-xl bg-white/80 rounded-3xl shadow-xl px-6 py-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="text-center mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="text-4xl mb-2"
                    >
                        🔗
                    </motion.div>
                    <h2 className="text-2xl font-bold text-blue-700">URL Shortener</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Make your links clean, short & shareable ✨
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="url"
                            className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.originalUrl ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Paste your long URL here..."
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                        />
                        {errors.originalUrl && (
                            <p className="text-red-500 text-sm mt-1">{errors.originalUrl}</p>
                        )}
                    </div>

                    {/* <div>
                        <input
                            type="text"
                            className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.customAlias ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Custom alias (optional)"
                            value={customAlias}
                            onChange={(e) => setCustomAlias(e.target.value)}
                        />
                        {errors.customAlias && (
                            <p className="text-red-500 text-sm mt-1">{errors.customAlias}</p>
                        )}
                    </div> */}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
                    >
                        🚀 Shorten URL
                    </button>
                </form>

                <AnimatePresence>
                    {shortUrl && (
                        <motion.div
                            key="result"
                            className="mt-6 bg-green-100 p-4 rounded-xl flex items-center justify-between gap-2"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-green-800 text-sm font-medium hover:underline break-words flex-1"
                            >
                                {shortUrl}
                            </a>
                            <button
                                onClick={handleCopy}
                                className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            
        </div>
    );
}

export default ShortenerForm;
