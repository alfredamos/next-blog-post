import {getAuthorId} from "@/app/actions/author.action";
import DeleteAuthor from "@/app/authors/[id]/delete/DeleteAuthor";

export default async function DeleteAuthorByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In delete-author", await params)
    const {id} = await params;

    const author = await getAuthorId(id);

    return (
        <DeleteAuthor author={author} id={id}/>
    );
}