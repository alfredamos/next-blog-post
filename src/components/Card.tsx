import React, {ReactNode} from 'react';
import Link from "next/link";
import Image from "next/image";

type Props = {
    children: ReactNode,
    name: string;
    address: string;
    image: string;
    path: string;
}

const Card = ({children, name, image, address, path}:Props) => {
    return (
        <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white mx-auto mt-6 w-full">
            {/* Card Image */}
            <div className="relative w-full h-auto aspect-square object-cover object-cover object-center bg-cover">
                <Image
                    className="object-cover"
                    src={`${image.startsWith("http") ? image : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000"}`}
                    alt="Nike Air Max Sneakers"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                />
            </div>


            {/* Card Content */}
            <div className="p-6">
                {/* Card Title */}
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                    {name}
                </h2>

                {/* Card Description */}
                <p className="text-gray-600 text-base mb-4">
                    {address}
                </p>
            </div>

            {/* Card Actions/Buttons */}
            <div className="px-6 pt-4 pb-6 flex justify-between items-center">
                <Link href={`/${path}`} className="bg-gray-200 hover:text-gray-200 text-gray-800 hover:bg-gray-800 hover: font-semibold px-4 py-2 rounded-lg shadow-md transition duration-200 mr-4">
                    Back
                </Link>
                {children}
            </div>
        </div>
    );
};

export default Card;
