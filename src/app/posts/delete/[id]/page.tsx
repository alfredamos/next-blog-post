import {deletePostById} from "@/src/app/api/actions/post.action";

export default async function DeletePostById(request:Request, {params}:{params:Promise<{id:string}>}) {
    const {id} = await params;
    await deletePostById(id);
    return(
        <h1>Delete post by id</h1>
    )
}
