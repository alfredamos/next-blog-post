import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link href="/" passHref>
                    <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                        Go to Homepage
                    </button>
                </Link>
            </div>
        </div>
    );
}