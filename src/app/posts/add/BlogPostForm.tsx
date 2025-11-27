"use client"

import CancelButton from "@/utils/CancelButton";
import Form from "next/form";
import {useRouter} from "next/navigation";
import {Post} from "@/validations/post.validation";

type Prop = {
    post : Post;
    postAction : (formData: FormData) => void;
}

export default function BlogPostForm({post, postAction}: Prop) {
    const router = useRouter();
    const postAddAction = async (formData: FormData) => {
        postAction(formData);

        router.refresh();
        router.push("/");
    }

    return (
        <Form
            action={postAddAction}
            className="bg-gray-100 text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
        >
            <h4 className="font-bold text-slate-800 text-2xl py-4">New Post</h4>
            <input hidden id="id" name="id" type="text" value={post?.id} readOnly/>
            <div className="mb-6 w-full px-10">
                <label htmlFor="title" className="flex flex-start w-full font-medium">
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={post?.title ?? ""}
                    className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 p-2 rounded-lg text-black w-full"
                />
            </div>
            <div className="mb-6 w-full px-10">
                <label htmlFor="imageUrl" className="flex flex-start w-full font-medium">
                    Image Url
                </label>
                <input
                    id="imageUrl"
                    name="imageUrl"
                    type="text"
                    defaultValue={post?.imageUrl ?? ""}
                    className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 p-2 rounded-lg text-black w-full"
                />
            </div>

            <div className="mb-5 w-full px-10">
                <label
                    htmlFor="content"
                    className="flex flex-start w-full font-medium"
                >
                    Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    defaultValue={post?.content ?? ""}
                    className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
                />
            </div>
            <div className="flex justify-between w-full px-10">
                <button
                    type="submit"
                    className="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white text-indigo-900 font-bold text-lg rounded-lg mr-4 w-full"
                >
                    Submit
                </button>
                <CancelButton className="w-full" />
            </div>
        </Form>
    );
}