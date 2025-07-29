import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function Analytics() {
    const [urls, setUrls] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 5;

    const fetchData = async () => {
        try {
            const res = await axios.get(
                `https://urlshortener-vwzz.onrender.com/analytics?page=${page}&limit=${limit}`
            );
            setUrls(res.data.data);
            setTotal(res.data.total);
        } catch {
            alert('❌ Failed to fetch analytics');
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const totalPages = Math.ceil(total / limit);

    return (
        <motion.div
            className="px-4 py-8 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
                📊 URL Analytics Dashboard
            </h2>

            <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                <motion.table
                    className="min-w-full divide-y divide-gray-200 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left">Short URL</th>
                            <th className="px-6 py-3 text-left">Original URL</th>
                            <th className="px-6 py-3 text-left">Clicks</th>
                            <th className="px-6 py-3 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {urls.map((url) => (
                            <motion.tr
                                key={url._id}
                                className="hover:bg-gray-50 transition"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="px-6 py-4 break-all text-blue-600">
                                    <a
                                        href={`https://urlshortener-vwzz.onrender.com/${url.shortId}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:underline"
                                    >
                                        {url.shortId}
                                    </a>
                                </td>
                                <td className="px-6 py-4 break-words whitespace-pre-wrap text-gray-700">
                                    {url.originalUrl}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-900">{url.clicks}</td>
                                <td className="px-6 py-4 text-gray-500">
                                    {new Date(url.createdAt).toLocaleString()}
                                </td>
                            </motion.tr>
                        ))}
                        {urls.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-400 px-6 py-10">
                                    No analytics data available yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </motion.table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2 text-sm">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="px-3 py-2">{`Page ${page} of ${totalPages}`}</span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
}

export default Analytics;
