import {getUserById} from "@/app/actions/user.action";
import DeleteUser from "@/app/users/[id]/delete/DeleteUser";
import {CustomError} from "@/utils/customError.util";
import {User} from "@prisma/client";
import {ownerCheckOrAdmin} from "@/utils/ownerCheckOrAdmin.util";

export default async function DeleteUserPage({params}:{params: Promise<{id: string}>}){
    console.log("At point 1, in delete user page, params: ", await params);

    const {id} = await params;
    const {user: currentUser, error} = await getUserById(id);

    console.log("In delete-user page, error : ", error);
    if (error){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(error as CustomError)?.message}</h1></div>
    }

    const user = currentUser as User;

    //----> Check for ownership or admin privilege.
    if (! await ownerCheckOrAdmin(user.id)){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">You do not have permission to view or perform any action on this page!</h1></div>
    }

    console.log("At point 2, in delete user page, user: ", user);

    return (
        <DeleteUser user={user} id={id} />
    );
}