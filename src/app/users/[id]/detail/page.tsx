import {getUserById} from "@/app/actions/user.action";
import Card from "@/components/Card";
import DetailPostCardButtons from "@/components/DetailPostCardButtons";
import {CustomError} from "@/utils/customError.util";
import {User} from "@prisma/client";
import {ownerCheckOrAdmin} from "@/utils/ownerCheckOrAdmin.util";

export default async function GetUserPage({params}:{params: Promise<{id: string}>}){
    console.log("At point 1, in get user page, params: ", await params);

    const {id} = await params;

    const {user: currentUser, error} = await getUserById(id);

    console.log("In get-user page, error : ", error);
    if (error){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(error as CustomError)?.message}</h1></div>
    }

    const user = currentUser as User;

    //----> Check for ownership or admin privilege.
    if (! await ownerCheckOrAdmin(user.id)){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">You do not have permission to view or perform any action on this page!</h1></div>
    }

    return (
        <Card name={user.name} address={""} image={user.image} path="users" >
            <DetailPostCardButtons id={id} isAddButton={false} isEditButton={false} path="users"/>
        </Card>

    );
}