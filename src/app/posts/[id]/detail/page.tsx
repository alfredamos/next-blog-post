import {getPostById} from "@/app/actions/post.action";
import {getAuthorId} from "@/app/actions/author.action";
import DetailPostCardButtons from "@/components/DetailPostCardButtons";
import BlogCard from "@/components/BlogCard";
import {CustomError} from "@/utils/customError.util";
import {Post} from ".prisma/client";
import {Author} from "@prisma/client";

export default async function GetPostByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In detail-blog", await params)
    const {id} = await params;

    const {post: currentPost, error: errorPost} = await getPostById(id);
    const post = currentPost as Post;
    console.log("In detail-post, post : ", post);

    //----> Check for error in fetching post.
    if (errorPost){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(errorPost as CustomError)?.message}</h1></div>
    }

    const {author: currentAuthor, error: errorAuthor} = await getAuthorId(post?.authorId as string);

    const author = currentAuthor as Author;

    //----> Check for error in fetching author.
    if (errorAuthor){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(errorAuthor as CustomError)?.message}</h1></div>
    }


    return (
        <BlogCard authorName={author.name} id={post.id} title={post.title} description={post.content} image={""}>
            <DetailPostCardButtons id={id} isAddButton={true} isEditButton={true} path="posts"/>
        </BlogCard>

    );
}