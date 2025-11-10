import Form from "next/form";
import {loginUser} from "@/app/actions/auth.action";
import {LoginUser} from "@/validations/auth.validation";

type Props = {
    login: LoginUser;
}

export default function LoginForm({ login }: Props) {
    return (
        <div className="bg-white shadow-xlg w-1/2 mx-auto mt-10 px-4 border border-gray-900 rounded-lg">
        <Form action={loginUser}>
            <h2 className="px-6 mb-3">Login Form</h2>
            <div className="mb-3 px-6">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email address"
                defaultValue={login?.email}
                className="border border-slate-100 rounded-sm px-1"
                />
            </div>
            <div className="mb-3 px-6">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                placeholder="Enter your Password"
                name="password"
                id="password"
                defaultValue={login?.password}
                className="border border-slate-100 rounded-sm px-1 text-muted px-1"
                />
            </div>
            <div className="px-6 mb-3 flex justify-between items-center">
                <button type="submit" className="border border-slate-900 rounded-sm px-2 py-1 hover:bg-slate-900 hover:text-slate-100">Login</button>
                <button type="button" className="border border-slate-900 rounded-sm px-2 py-1 hover:bg-yellow-900 hover:text-yellow-100">Back</button>
            </div>
        </Form>
        </div>
    )
}