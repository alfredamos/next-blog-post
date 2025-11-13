'use client';

import { useEffect, useState } from 'react';

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
        // Simulate a loading delay before showing the error message
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // 1.5 seconds loading time
        return () => clearTimeout(timer);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {isLoading ? (
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    <p className="text-lg text-gray-700">Loading error details...</p>
                </div>
            ) : (
                <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
                    <h2 className="text-3xl font-bold text-red-600 mb-4">Something went wrong!</h2>
                    <p className="text-gray-700 mb-6">{error.message || 'An unexpected error occurred.'}</p>
                    <button
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                        onClick={() => reset()}
                    >
                        Try again
                    </button>
                </div>
            )}
        </div>
    );
}