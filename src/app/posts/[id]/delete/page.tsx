import DeletePost from "@/app/posts/[id]/delete/DeletePost";
import {getPostById} from "@/app/actions/post.action";
import {getAuthorId} from "@/app/actions/author.action";

export default async function DeletePostByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In delete-post", await params)
    const {id} = await params;

    const post = await getPostById(id);
    const author = await getAuthorId(post.authorId as string);

    return (
        <DeletePost author={author} post={post} id={id}/>
    );
}