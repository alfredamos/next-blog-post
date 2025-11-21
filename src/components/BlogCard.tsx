import React, {ReactNode} from 'react';
import Link from "next/link";
import BlogPostContent from "@/components/BlogPostContent";

type Props = {
    title: string;
    description: string;
    image: string;
    authorName: string;
    id: string;
    children: ReactNode;
}

export default function BlogCard({authorName, children, id, image, title, description}:Props) {
    console.log("In BlogCard, authorName", authorName);
    return (
        <div className="max-w-sm mx-auto mt-4 rounded-lg shadow-lg overflow-hidden bg-white">
            {/* Card Image */}
            <div className="flex items-center justify-between p-6">
            <img
                className="h-20 w-20 rounded-full"
                src={`${image !== "" ? image : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000"}`}
                alt="Nike Air Max Sneakers"
            />
                <h4>{authorName}</h4>
            </div>
            {/* Card Content */}
            <div className="p-6">
                {/* Card Title */}
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                    {title}
                </h2>

                {/* Card Description */}
                <div className="text-gray-600 text-base mb-4">
                    {/*{description}*/}
                    <BlogPostContent content={description}/>
                </div>
            </div>

            {/* Card Actions/Buttons */}
            <div className="px-6 pb-6 flex justify-between items-center">

                <Link href="/posts" className="bg-gray-200 hover:text-gray-200 text-gray-800 hover:bg-gray-800 hover: font-semibold px-4 py-2 rounded-lg shadow-md transition duration-200 mr-4">
                    Back
                </Link>
                {children}
            </div>
        </div>
    );
};

