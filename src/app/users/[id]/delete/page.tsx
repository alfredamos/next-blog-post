import {getUserById} from "@/app/actions/user.action";

export default async function DeleteUserPage({params}:{params: Promise<{id: string}>}){
    console.log("At point 1, in delete user page, params: ", await params);

    const {id} = await params;
    const user = await getUserById(id);

    console.log("At point 2, in delete user page, user: ", user);

    return (
        <h1>Delete user with the id: {user.id}</h1>
    );
}