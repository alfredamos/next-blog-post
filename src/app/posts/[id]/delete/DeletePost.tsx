"use client"

import Modal from "@/components/Modal";
import {useState} from "react";
import {Post} from ".prisma/client";
import Form from "next/form";
import {deletePostById} from "@/app/actions/post.action";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Author} from "@prisma/client";
import BlogCard from "@/components/BlogCard";

type Prop = {
    author: Author;
    post: Post;
    id: string;
}

export default function DeletePost({author, post, id}: Prop) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const router = useRouter();

    const deletePostAction = async () => {
        await deletePostById(id)
        handleCloseModal();

        router.push("/");
    }

    return (
        <div className="text-white flex justify-center items-center"> {/* Ensure your root element has an ID for accessibility binding */}
            <div className="flex items-center justify-between mt-12 bg-white px-8 py-8 text-black semi-bold rounded-md shadow-lg">
                <h4>Do you want to delete : {post.title} ?</h4>
                <button onClick={handleOpenModal} className="bg-yellow-900 text-white font-bold text-white px-4 py-2 rounded-lg hover:bg-white hover:text-yellow-900 ml-4">
                    Delete ?
                </button>
                <Link href="/"  className="bg-indigo-900 text-white font-bold text-white px-4 py-2 rounded-lg hover:bg-white hover:text-indigo-900 ml-4">
                    Back
                </Link>
            </div>


            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>

                <BlogCard authorName={author.name} id={post.id} title={post.title} description={post.content} image={""}>
                    <Form action={deletePostAction}>
                        <button type="submit" className="bg-rose-900 text-white font-bold text-white px-4 py-2 rounded-lg hover:bg-white hover:text-rose-900">Delete</button>
                    </Form>
                </BlogCard>

            </Modal>
        </div>
    );
}