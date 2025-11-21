import EditAuthorForm from "@/app/authors/[id]/edit/EditAuthorForm";
import {getAuthorId} from "@/app/actions/author.action";

export default async function EditAuthorByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In edit-author", await params)
    const {id} = await params;

    const author = await getAuthorId(id);

    return (
        <EditAuthorForm author={author}/>
    );
}