import Form from "next/form";
import {redirect} from "next/navigation";
import {refreshUserTokenAction} from "@/app/actions/auth.action";

export default function RefreshUserToken(){
    const tokenRefresher = async()=>{
        "use server"
        const refreshTokenJson = await fetch("/api/auth/refresh");
        const refreshToken = await refreshTokenJson.json();
        console.log("In refresh-user-token, refreshToken : ", refreshToken);
        redirect("/");
    }



    return (
        <Form action={refreshUserTokenAction} className="flex justify-center items-center border border-gray-200 max-w-3xl m-40 hover:text-white hover:bg-yellow rounded-lg">
            <button type="submit" className="font-bold">Refresh Token</button>
        </Form>
    );
}