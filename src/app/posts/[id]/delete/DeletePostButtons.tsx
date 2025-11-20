"use client"

import Link from "next/link";
import Form from "next/form";

type Post = {
    deletePostAction: (formData: FormData) => void;
}


export default function DeletePostButtons({deletePostAction}: Post) {
    return (
        <div className="flex justify-between items-center px-4 py-6">
            <Form action={deletePostAction}>
                <button type="submit" className="bg-rose-900 text-white font-bold text-white px-4 py-2 rounded-lg hover:bg-white hover:text-rose-900">Delete</button>
            </Form>
            <Link href="/" className="bg-zinc-100 text-indigo-900 hover:text-zinc-100 hover:bg-indigo-900 hover:border-100 border-2 border-indigo-900 px-4 py-2 font-bold rounded-md">Back</Link>
        </div>
    )
}