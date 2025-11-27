import DeletePost from "@/app/posts/[id]/delete/DeletePost";
import {getPostById} from "@/app/actions/post.action";
import {getAuthorId} from "@/app/actions/author.action";
import {Post} from ".prisma/client";
import {Author} from "@prisma/client";
import {CustomError} from "@/utils/customError.util";
import {ownerCheckOrAdmin} from "@/utils/ownerCheckOrAdmin.util";

export default async function DeletePostByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In delete-post", await params)
    const {id} = await params;

    const {post: currentPost, error: errorPost} = await getPostById(id);
    const post = currentPost as Post;

    //----> Check for error in fetching post.
    if (errorPost){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(errorPost as CustomError)?.message}</h1></div>
    }

    console.log("In delete-post, post : ", post)

    const {author: currentAuthor, error: errorAuthor} = await getAuthorId(post?.authorId as string);

    const author = currentAuthor as Author;

    //----> Check for error in fetching author.
    if (errorAuthor){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(errorAuthor as CustomError)?.message}</h1></div>
    }

    //----> Check for ownership of admin privilege.
    if (! await ownerCheckOrAdmin(author.userId)){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">You do not have permission to view or perform any action on this page!</h1></div>
    }

    return (
        <DeletePost author={author} post={post} id={id}/>
    );
}