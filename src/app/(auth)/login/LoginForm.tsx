"use client"

import Form from "next/form";
import {loginUser as loginAction} from "@/app/actions/auth.action";
import {useRouter} from "next/navigation";
import {useAuthContext} from "@/hooks/useAuthContext";
import CancelButton from "@/utils/CancelButton";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {LocalStorageParam} from "@/utils/LocalStorageParam";

export default function LoginForm() {
    const router = useRouter();
    const {setUserResponse} = useAuthContext()
    const {setLocalStorage} = useLocalStorage<UserResponse>()

    const loginSubmitHandler = async (formData: FormData) => {
        try {
            const response = await loginAction(formData); //----> Login.

            //----> Set both the auth-context and local-storage.
            setUserResponse(response);
            setLocalStorage(LocalStorageParam.userResp, response as UserResponse)

        } catch (error) {
            console.error(error); //----> Show toast for successful login.
        }finally{
            router.push("/");
        }
    }
    return (
        <Form
            action={loginSubmitHandler}
            className="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
        >
            <h4 className="font-bold text-slate-800 text-2xl mb-6">Login Form</h4>
            <div className="mb-6 w-full px-10">
                <label
                    htmlFor="email"
                    className="flex flex-start w-full font-medium tracking-wide"
                >
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
                />
            </div>
            <div className="mb-6 w-full px-10">
                <label
                    htmlFor="password"
                    className="flex flex-start w-full font-medium"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
                />
            </div>
            <div className="flex justify-between w-full px-10 mb-6">
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