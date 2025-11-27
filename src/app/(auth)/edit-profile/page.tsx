import EditProfileForm from "@/app/(auth)/edit-profile/EditProfileForm";
import {getLoggedInUserInfo} from "@/lib/getLoggedInUser";
import {unauthorized} from "next/navigation";
import {getAuthorEmail} from "@/app/actions/author.action";
import {CustomError} from "@/utils/customError.util";
import {Author} from "@prisma/client";

export default async function EditProfilePage() {
    //----> Get user session.
    const userResponse = await getLoggedInUserInfo();

    //----> Check for null session.
    if (!userResponse) unauthorized();

    //----> Get the author associated with this user.
    const {author: currentAuthor, error} = await getAuthorEmail(userResponse.email);

    //----> Check for error.
    if (error) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(error as CustomError)?.message}</h1></div>
    }

    const author = currentAuthor as Author;

    return (
        <EditProfileForm author={author}/>
    );
}