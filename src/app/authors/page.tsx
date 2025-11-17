import {getAllAuthors} from "@/app/actions/author.action";
import {adminUserUtil} from "@/utils/adminUser.util";

export default async function Page(){
    //----> Check for admin privilege.
    const isAdmin = await adminUserUtil();
    console.log("In all-authors-page", isAdmin);
    if (!isAdmin) {
        return <h1 className="flex justify-center items-center bg-white p-4">You are not permitted to view or perform any action on this page!</h1>
    }

    const allAuthors = await getAllAuthors();

    return (
        <>{allAuthors.map(author => <h2 key={author.id} className="pl-50">{author.name}</h2>)
        }</>
    );
}