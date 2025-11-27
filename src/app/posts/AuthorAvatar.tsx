import React from "react";
import {Post} from ".prisma/client";
import Image from "next/image";
import {getAuthorId} from "@/app/actions/author.action";
import {Author} from "@prisma/client";
import {CustomError} from "@/utils/customError.util";

type Props = {
    post: Post;
}

export default async function AuthorAvatar({post}: Props) {
    console.log("In author-avatar, post : ", post);
    const {author: currentAuthor, error} = await getAuthorId(post.authorId as string);

    //----> Check for error.
    if (error){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(error as CustomError)?.message}</h1></div>
    }

    const author = currentAuthor as Author;
    const authorName = author.name;
    const image = author.image;
    return (
        <>
            <div className="flex items-center gap-20 p-6 mx-auto text-sm">
                <Image
                    className="h-20 w-20 rounded-full"
                    src={`${image.startsWith("http")  ? image : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000"}`}
                    alt="Nike Air Max Sneakers"
                    width={80}
                    height={80}
                    priority
                />
                <h4>{authorName}</h4>
            </div>
            <h3 className="p-6 text-lg font-semibold mb-2">{post.title}</h3>
        </>

    );
}
