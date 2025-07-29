// components/GuestCredits.jsx

import React from 'react';

function GuestCredits({ guestCredits }) {
    if (!guestCredits) return null;

    return (
        <div className="text-sm text-gray-500 mt-3 text-center">
            Guest usage: {guestCredits.used} / {guestCredits.max} credits used
        </div>
    );
}

export default GuestCredits;
