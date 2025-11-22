import React from "react";
import {Post} from ".prisma/client";
import {getAuthorId} from "@/app/actions/author.action";

type Props = {
    post: Post;
}

export default async function AuthorAvatar({post}: Props) {
    const author = await getAuthorId(post.authorId as string);
    const authorName = author.name;
    const image = author.image;
    return (
        <>
            <div className="flex items-center gap-20 p-6 text-sm">
                <img
                    className="h-10 w-10 rounded-full"
                    src={`${image.startsWith("http")  ? image : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000"}`}
                    alt="Nike Air Max Sneakers"
                />
                <h4>{authorName}</h4>
            </div>
            <h3 className="p-6 text-lg font-semibold mb-2">{post.title}</h3>
        </>

    );
}
