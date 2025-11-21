import {getUserById} from "@/app/actions/user.action";
import DeleteUser from "@/app/users/[id]/delete/DeleteUser";

export default async function DeleteUserPage({params}:{params: Promise<{id: string}>}){
    console.log("At point 1, in delete user page, params: ", await params);

    const {id} = await params;
    const user = await getUserById(id);

    console.log("At point 2, in delete user page, user: ", user);

    return (
        <DeleteUser user={user} id={id} />
    );
}