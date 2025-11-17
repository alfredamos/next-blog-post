import {getAllUsers} from "@/app/actions/user.action";
import {adminUserUtil} from "@/utils/adminUser.util";

export default async function AllUsersPage(){
    //----> Check for admin privilege.
    const isAdmin = await adminUserUtil();
    console.log("In all-users-page", isAdmin);
    if (!isAdmin) {
        return <h1 className="flex justify-center items-center bg-white p-4">You are not permitted to view or perform any action on this page!</h1>
    }

    const allUsers = await getAllUsers();
    return (
        <>{allUsers.map(user => <h2 key={user.id} className="pl-50">{user.name}</h2>)
        }</>
    );
}