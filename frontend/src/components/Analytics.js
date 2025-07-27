import { useEffect, useState } from 'react';
import axios from 'axios';

function Analytics() {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        axios.get('https://urlshortener-vwzz.onrender.com/analytics')
            .then(res => setUrls(res.data))
            .catch(() => alert('Failed to fetch analytics'));
    }, []);

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <table className="w-full table-auto border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Short URL</th>
                        <th className="border px-4 py-2">Original URL</th>
                        <th className="border px-4 py-2">Clicks</th>
                        <th className="border px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map(url => (
                        <tr key={url._id}>
                            <td className="border px-4 py-2">
                                <a href={`https://urlshortener-vwzz.onrender.com/${url.shortId}`} target="_blank" rel="noreferrer">
                                    {url.shortId}
                                </a>
                            </td>
                            <td className="border px-4 py-2">{url.originalUrl}</td>
                            <td className="border px-4 py-2">{url.clicks}</td>
                            <td className="border px-4 py-2">{new Date(url.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Analytics;
