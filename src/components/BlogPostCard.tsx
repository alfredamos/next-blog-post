import {Author,Post} from "@prisma/client";
import BlogPostContent from "@/components/BlogPostContent";
import React, {JSX, ReactNode} from "react";

type Props = {
    post: Post;
    author: Author;
    id: string;
    children: ReactNode;
}

export default function BlogPostCard({author, children, id, post}: Props) {
    return (
        <article className="bg-gray-100 text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl mb-10 mt-10 grid grid-rows-4 gap-4 rounded-lg prose lg:prose-xl overflow-auto">
            {/*This container will have 3 columns and 4 rows */}
            <div> <h1 className="text-center py-2 font-bold border-b border-blue-100">{post?.title}</h1></div>
            <div className="flex flex-wrap gap-12 px-4 py-2 semi-bold border-b border-blue-100">
                <figure>
                    {/*<img src="pic_trulli.jpg" alt="Trulli, typical housing from Puglia, Italy" style="width:100%">*/}
                    <figcaption>Photo</figcaption>
                </figure>
                <span>{author?.name}</span>
            </div>
            <BlogPostContent content={post?.content}/>
            {children}

        </article>

    );
}