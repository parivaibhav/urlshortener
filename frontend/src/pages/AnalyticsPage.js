import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/analytics').then((res) => setData(res.data));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Analytics</h2>
            <ul className="space-y-2">
                {data.map((url) => (
                    <li key={url._id} className="bg-white p-3 rounded shadow">
                        <p><strong>Original:</strong> {url.originalUrl}</p>
                        <p><strong>Short:</strong> {url.shortId}</p>
                        <p><strong>Clicks:</strong> {url.clicks}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnalyticsPage;