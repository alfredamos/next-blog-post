import React from 'react';
import Link from "next/link";

type Props = {
    title: string;
    description: string;
    image: string;
}

const Card = ({title, image, description}:Props) => {
    return (
        <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white">
            {/* Card Image */}
            <img
                className="w-full h-48 object-cover"
                src={`${image !== "" ? image : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000"}`}
                alt="Nike Air Max Sneakers"
            />

            {/* Card Content */}
            <div className="p-6">
                {/* Card Title */}
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                    {title}
                </h2>

                {/* Card Description */}
                <p className="text-gray-600 text-base mb-4">
                    {description}
                </p>
            </div>

            {/* Card Actions/Buttons */}
            <div className="px-6 pt-4 pb-6 flex justify-between items-center">
                <span className="text-2xl font-semibold text-gray-900">$130.00</span>
                <div>
                    <Link href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 mr-2">
                        Buy Now
                    </Link>
                    <Link href="#" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
                        Add to Cart
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
