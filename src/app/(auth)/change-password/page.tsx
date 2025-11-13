import {getCurrentUser} from "@/app/actions/auth.action";
import ChangePasswordForm from "@/app/(auth)/change-password/ChangePasswordForm";

export default async function ChangePasswordPage(){
    //----> Get the current logged-in user.
    const user = await getCurrentUser();

    return (
        <ChangePasswordForm email={user?.email}/>
    );
}