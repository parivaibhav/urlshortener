import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                jwtDecode(token); // will throw if invalid
                setIsLoggedIn(true);
            } catch {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
            }
        }
    }, []);

    return (
        <motion.nav
            className="w-full px-4 py-3 bg-white shadow-md fixed top-0 left-0 z-50"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                {/* Logo / Brand */}
                <Link to="/" className="text-blue-600 font-bold text-xl">
                    🔗 Shortify
                </Link>

                {/* Conditional Analytics Link */}
                {isLoggedIn && (
                    <Link to="/analytics" className="text-sm text-gray-700 hover:text-blue-600">
                        Analytics
                    </Link>
                )}
            </div>
        </motion.nav>
    );
}

export default Navbar;
