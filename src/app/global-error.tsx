'use client'; // Required for client components

import { useEffect } from 'react';

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <html>
        <body>
        <h2>Something went wrong globally!</h2>
        <p>{error.message}</p> {/* Display error message */}
        <button
            onClick={() => reset()} // Attempt to recover by re-rendering
        >
            Try again
        </button>
        </body>
        </html>
    );
}