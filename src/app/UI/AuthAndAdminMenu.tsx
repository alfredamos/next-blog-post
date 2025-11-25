"use client"

import Dropdown from "@/components/Dropdown";
import {settingItems} from "@/app/UI/settingItemLinks";
import {adminItems} from "@/app/types/adminItemLinks";
import Form from "next/form";
import Link from "next/link";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {LocalStorageParam} from "@/utils/LocalStorageParam";
import {logoutUser} from "@/app/actions/auth.action";
import {useState} from "react";
import {useAuthContext} from "@/hooks/useAuthContext";
import {redirect} from "next/navigation";


export default function AuthAndAdminMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const {getLocalStorage, removeLocalStorage} = useLocalStorage<Session>();
    const {userResponse} = useAuthContext();

    const userResp = userResponse ?? getLocalStorage(LocalStorageParam.userResp);


    const logoutUserAction = async () => {
        removeLocalStorage(LocalStorageParam.userResp);
        await logoutUser();
    }

    return (
        <div className="flex items-center space-x-4">
            {userResp?.isLoggedIn ? (
                    <>
                        {userResp?.isAdmin && <Dropdown title="Admin" items={adminItems} />}

                        <Dropdown title="Settings" items={settingItems} />
                        <Form action={logoutUserAction}>
                            <button type="submit" className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition duration-300">
                                Logout
                            </button>
                        </Form>
                    </>
                ) :
                (
                    <>
                        <Link href="/signup" className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition duration-300">Signup</Link>
                        <Link href="/login" className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition duration-300">Login</Link>
                    </>
                )
            }

        </div>
    );

}