import BlogPostForm from "@/app/posts/add/BlogPostForm";
import {editPostById, getPostById} from "@/app/actions/post.action";
import {Post} from "@/validations/post.validation";
import {CustomError} from "@/utils/customError.util";
import {ownerCheckOrAdmin} from "@/utils/ownerCheckOrAdmin.util";
import {getAuthorId} from "@/app/actions/author.action";
import {Author} from "@prisma/client";

export default async function EditPostByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In delete-post", await params)
    const {id} = await params;
    const {post, error: errorPost} = await getPostById(id);

    //----> Check for error.
    if (errorPost){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(errorPost as CustomError)?.message}</h1></div>
    }

    const {author: currentAuthor, error: errorAuthor} = await getAuthorId(post?.authorId as string);

    //----> Check for error.
    if (errorAuthor){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(errorAuthor as CustomError)?.message}</h1></div>
    }

    const author = currentAuthor as Author;

    //----> Check for ownership of admin privilege.
    if (! await ownerCheckOrAdmin(author.userId)){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">You do not have permission to view or perform any action on this page!</h1></div>
    }

    return (
        <BlogPostForm postAction={editPostById} post={post as Post} />
    );
}