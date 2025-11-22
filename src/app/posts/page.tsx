import {getAllPosts} from "@/app/actions/post.action";
import Link from "next/link";
import BlogPostContent from "@/components/BlogPostContent";
import React from "react";
import AuthorAvatar from "@/app/posts/AuthorAvatar";




export default async function GetAllPostPage() {
    const allPosts = await getAllPosts();

    return (
        <div className="container max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPosts.map((post) => (
                    <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                        <AuthorAvatar post={post} />
                        {/*<h3 className="text-xl font-semibold mb-2">{post.title}</h3>*/}
                        <div className="text-gray-700 mb-4"><BlogPostContent content={post.content}/></div>
                        <div className="flex space-x-2">
                            <Link href={`/posts/${post.id}/detail`}>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Detail
                                </button>
                            </Link>
                            <Link href={`/posts/${post.id}/edit`}>
                                <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">
                                    Edit
                                </button>
                            </Link>
                            <Link href={`/posts/${post.id}/delete`}>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
