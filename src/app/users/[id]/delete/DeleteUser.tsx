"use client"

import Modal from "@/components/Modal";
import {useState} from "react";
import Form from "next/form";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Card from "@/components/Card";
import {deleteUserById} from "@/app/actions/user.action";
import {UserDto} from "@/dto/toUser.dto";

type Prop = {
    user: UserDto;
    id: string;
}

export default function DeleteUser({user, id}: Prop) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const router = useRouter();

    const deleteUserAction = async () => {
        await deleteUserById(id);
        handleCloseModal();

        router.push("/");
    }

    return (
        <div className="text-white flex justify-center items-center"> {/* Ensure your root element has an ID for accessibility binding */}
            <div className="flex items-center justify-between mt-12 bg-white px-8 py-8 text-black semi-bold rounded-md shadow-lg">
                <h4>Do you want to delete : {user.name} ?</h4>
                <button onClick={handleOpenModal} className="bg-yellow-900 text-white font-bold text-white px-4 py-2 rounded-lg hover:bg-white hover:text-yellow-900 ml-4">
                    Delete ?
                </button>
                <Link href="/users"  className="bg-indigo-900 text-white font-bold text-white px-4 py-2 rounded-lg hover:bg-white hover:text-indigo-900 ml-4">
                    Back
                </Link>
            </div>


            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>

                <Card name={user.name} address={""} image={user.image} path="users">
                    <Form action={deleteUserAction}>
                        <button type="submit" className="bg-rose-900 text-white font-bold text-white px-4 py-2 rounded-lg hover:bg-white hover:text-rose-900">Delete</button>
                    </Form>
                </Card>

            </Modal>
        </div>
    );
}