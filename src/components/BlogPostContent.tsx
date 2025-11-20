"use client"

import {JSX, useState} from "react";

type Prop = {
    content: string;
}

export default function BlogPostContent({content}: Prop): JSX.Element {
    console.log(content);
    const [showFullContent, setShowFullContent] = useState(false);
    const truncatedLength = 100; // Define your desired truncation length

    const displayedContent = showFullContent ? content : content.substring(0, truncatedLength) + '...';

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    return (
        <div className="px-4 py-2 border-b border-blue-100">
            <p className="break-words">
                {displayedContent}
            </p>
            {content.length > truncatedLength && ( // Only show button if content is longer than truncated length
                <button onClick={toggleContent} className="bg-zinc-100 text-indigo-900 hover:text-zinc-100 hover:bg-indigo-900 hover:border-100 px-2 py-1 font-bold rounded-md">
                    {showFullContent ? 'Show Less' : 'Read More'}
                </button>
            )}
        </div>
    );
}