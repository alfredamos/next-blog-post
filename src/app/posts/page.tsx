import {getAllPosts} from "@/app/actions/post.action";
import Link from "next/link";

export default async function GetAllPosts() {
   const allPosts = await getAllPosts();
    return (
        <div className="bg-white sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mt-10 px-6 py-4 rounded-lg shadow-3xl w-full">{allPosts.map(post =><div key={post.id} className=" flex items-center gap-4">
            <h2  className="pl-50 mx-4">{post.title}</h2>
            <Link href="/posts/add" className="text-brown-900">Add</Link>
            <Link href={`/posts/${post.id}/edit`} className="text-indigo-900">Edit</Link>
            <Link href={`/posts/${post.id}/delete`} className="text-rose-900">Delete</Link>
            <Link href={`/posts/${post.id}/detail`} className="text-green-900">Detail</Link>
        </div> )
        }</div>
    );
}