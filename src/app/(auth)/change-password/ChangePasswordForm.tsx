import {changeUserPassword} from "@/app/actions/auth.action";
import CancelButton from "@/utils/CancelButton";
import Form from "next/form";

type email = {
    email: string;
}

export default async function ChangePasswordForm({ email }: email) {
        return (
            <Form
                action={changeUserPassword}
                className="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
            >
                <h4 className="font-bold text-slate-800 text-2xl mb-6">
                    Change Password Form
                </h4>
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
                        defaultValue={email}
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
                        defaultValue=""
                        className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
                    />
                </div>
                <div className="mb-6 w-full px-10">
                    <label
                        htmlFor="newPassword"
                        className="flex flex-start w-full font-medium"
                    >
                        New Password
                    </label>
                    <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        defaultValue=""
                        className="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
                    />
                </div>
                <div className="mb-6 w-full px-10">
                    <label
                        htmlFor="confirmPassword"
                        className="flex flex-start w-full font-medium"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        defaultValue=""
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