import Form from "next/form";
import {logoutUser} from "@/app/actions/auth.action";

export default function LogoutForm(){
    return (
        <Form action={logoutUser} className="border border-slate-100 rounded-sm px-1 py-1 w-1/2">
            <button type="submit" className="bg-slate-100 border border-slate-100 rounded-sm px-1 w-full">
                Logout
            </button>
        </Form>
    );
}