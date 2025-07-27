import ShortenerForm from '../components/ShortenerForm';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [totalCount, setTotalCount] = useState(0);
    useEffect(() => {
        const fetchCount = async () => {
            const res = await axios.get('https://urlshortener-vwzz.onrender.com/count');
            setTotalCount(res.data.total);
        };
        fetchCount();
    }, []);
    return (
        <div className=" bg-gradient-to-br from-blue-100 via-white to-blue-200">
            <ShortenerForm />
            <p className="text-center text-sm text-gray-500 mt-4">
                🔢 Total URLs shortened: <span className="font-semibold text-blue-600">{totalCount}</span>
            </p>

            <footer className="mt-12 bg-white/80 backdrop-blur-md shadow-inner py-4">
                <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
                    <p className="text-center sm:text-left mb-2 sm:mb-0">
                        © {new Date().getFullYear()} URL Shortener. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <a
                            href="https://github.com/yourusername/urlshortener"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://yourportfolio.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                        >
                            Portfolio
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
