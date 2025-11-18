import {getUserById} from "@/app/actions/user.action";

export default async function GetUserPage({params}:{params: Promise<{id: string}>}){
    console.log("At point 1, in get user page, params: ", await params);

    const {id} = await params;
    const user = await getUserById(id);

    console.log("At point 2, in get user page, user: ", user);

    return (
        <h1>Fetch user with the id: {user.id}</h1>
    );
}