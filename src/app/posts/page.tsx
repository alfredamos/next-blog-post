import {getAllPosts} from "@/app/actions/post.action";
import Link from "next/link";
import BlogPostContent from "@/components/BlogPostContent";
import React from "react";
import AuthorAvatar from "@/app/posts/AuthorAvatar";
import {CustomError} from "@/utils/customError.util";




export default async function GetAllPostPage() {
    const {posts, error} = await getAllPosts();

    //----> Check for error.
    if (error){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(error as CustomError)?.message}</h1></div>
    }

    const allPosts = posts ? posts : [];

    console.log("In get-all-post-page, posts : ", allPosts);
    return (
        <div className="container max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className=" text-gray-100 text-xl font-bold mb-6">Blog Posts</h1>
                <Link href="/posts/add" className="ring-1 ring-indigo-900 bg-indigo-100 px-2 py-1 text-indigo-900 hover:text-indigo-100 hover:bg-indigo-900 font-bold rounded-lg">Add Post</Link>
            </div>

            <div className="grid grid-cols-1 auto-rows-fr md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allPosts.map((post) => (
                    <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">

                        <AuthorAvatar post={post} />
                        {/*<h3 className="text-xl font-semibold mb-2">{post.title}</h3>*/}
                        <div className="text-gray-700 mb-4"><BlogPostContent content={post.content}/></div>
                        <div className="flex justify-between items-center gap-2">
                            <Link href={`/posts/${post.id}/detail`}>
                                <button className="ring-1 ring-indigo-900 bg-white hover:bg-indigo-900 text-indigo-900 hover:text-indigo-100 font-bold py-2 px-4 rounded">
                                    Detail
                                </button>
                            </Link>
                            <Link href={`/posts/${post.id}/edit`}>
                                <button className="ring-1 ring-amber-900 bg-white hover:bg-amber-900 text-amber-900 hover:text-amber-100 font-bold py-2 px-4 rounded">
                                    Edit
                                </button>
                            </Link>
                            <Link href={`/posts/${post.id}/delete`}>
                            <button
                                className="ring-1 ring-rose-900 bg-white hover:bg-rose-900 text-rose-900 hover:text-rose-100 font-bold py-2 px-4 rounded"
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
