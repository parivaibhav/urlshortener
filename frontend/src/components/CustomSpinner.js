import React from 'react';

export default function CustomSpinner() {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="flex items-end space-x-2 h-20">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2 rounded-full bg-gradient-to-b from-blue-400 to-slate-200 animate-bounce"
                        style={{
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: "1s",
                            height: "100%",
                            animationIterationCount: "infinite",
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
