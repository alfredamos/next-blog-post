import {getAuthorId} from "@/app/actions/author.action";
import DeleteAuthor from "@/app/authors/[id]/delete/DeleteAuthor";
import {Author} from "@prisma/client";
import {CustomError} from "@/utils/customError.util";
import {ownerCheckOrAdmin} from "@/utils/ownerCheckOrAdmin.util";

export default async function DeleteAuthorByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In delete-author", await params)
    const {id} = await params;

    const {author: currentAuthor, error} = await getAuthorId(id);

    //----> Check for error.
    if (error){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(error as CustomError)?.message}</h1></div>
    }

    const author = currentAuthor as Author;

    //----> Check for ownership or admin privilege.
    if (!(await ownerCheckOrAdmin(author.userId))){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">You do not have permission to view or perform any action on this page!</h1></div>
    }

    return (
        <DeleteAuthor author={author as Author} id={id}/>
    );
}