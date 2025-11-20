import {JSX} from "react";
import Link from "next/link";

type Prop = {
    id: string;
}

export default function DetailPostCardButtons({id}: Prop){
   return (
       <div className="flex justify-between items-center px-4 py-2">
       <Link href={`/posts/${id}/edit`} className="bg-zinc-100 text-indigo-900 hover:text-zinc-100 hover:bg-indigo-900 hover:border-100 border-2 border-indigo-900 px-4 py-2 mr-4 font-bold rounded-md">Edit</Link>
       <Link href="/posts/add" className="bg-zinc-100 text-green-900 hover:text-zinc-100 hover:bg-green-900 hover:border-100 border-2 border-indigo-900 px-4 py-2 font-bold mr-4 rounded-md">Add</Link>
       <Link href={`/posts/${id}/delete`} className="bg-zinc-100 text-rose-900 hover:text-zinc-100 hover:bg-rose-900 hover:border-100 border-2 border-rose-900 px-4 py-2 font-bold rounded-md">Delete</Link>
   </div>)
}