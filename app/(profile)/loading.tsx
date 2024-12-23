'use client';

import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent">
            <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-4 border-blue-600 rounded-full"></div>
        </div>
    );
};

export default Loading;
