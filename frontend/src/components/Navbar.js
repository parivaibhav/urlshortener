import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
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

                {/* Nav Links */}
                <div className="flex items-center gap-4 text-sm">
                    <Link
                        to="/signin"
                        className="text-gray-700 hover:text-blue-600 transition font-medium"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}

export default Navbar;
