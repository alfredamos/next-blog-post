import {getUserById} from "@/app/actions/user.action";
import Card from "@/components/Card";
import DetailPostCardButtons from "@/components/DetailPostCardButtons";

export default async function GetUserPage({params}:{params: Promise<{id: string}>}){
    console.log("At point 1, in get user page, params: ", await params);

    const {id} = await params;
    const user = await getUserById(id);

    console.log("At point 2, in get user page, user: ", user);

    return (
        <Card name={user.name} address={""} image={user.image} path="users" >
            <DetailPostCardButtons id={id} isAddButton={false} isEditButton={false} path="users"/>
        </Card>

    );
}