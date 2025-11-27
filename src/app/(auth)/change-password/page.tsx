import {getCurrentUser} from "@/app/actions/auth.action";
import ChangePasswordForm from "@/app/(auth)/change-password/ChangePasswordForm";
import {CustomError} from "@/utils/customError.util";
import {User} from "@prisma/client";

export default async function ChangePasswordPage(){
    //----> Get the current logged-in user.
    const {user: currentUser, error} = await getCurrentUser();

    //----> Check for error.
    if (error) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(error as CustomError)?.message}</h1></div>
    }

    const user = currentUser as User;

    return (
        <ChangePasswordForm email={user?.email}/>
    );
}