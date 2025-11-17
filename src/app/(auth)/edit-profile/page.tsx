import EditProfileForm from "@/app/(auth)/edit-profile/EditProfileForm";
import {getLoggedInUserInfo} from "@/lib/getLoggedInUser";
import {unauthorized} from "next/navigation";
import {getAuthorEmail} from "@/app/actions/author.action";
import {Author} from "@prisma/client";

export default async function EditProfilePage() {
    //----> Get user session.
    const userResponse = await getLoggedInUserInfo();

    //----> Check for null session.
    if (!userResponse) unauthorized();

    //----> Get the author associated with this user.
    const author = await getAuthorEmail(userResponse.email) as Author;

    return (
        <EditProfileForm author={author}/>
    );
}