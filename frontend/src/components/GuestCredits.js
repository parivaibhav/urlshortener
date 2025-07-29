import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GuestCredits({ onCreditsExhausted }) {
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        axios.get('https://urlshortener-vwzz.onrender.com/api/guest/credits').then((res) => {
            setCredits(res.data);
            if (res.data.remaining <= 0) onCreditsExhausted?.();
        });
    }, [onCreditsExhausted]);

    if (!credits) return null;

    return (
        <div className="text-sm text-gray-500 mt-3">
            Guest usage: {credits.used} / {credits.max} credits used
        </div>
    );
}

export default GuestCredits;
