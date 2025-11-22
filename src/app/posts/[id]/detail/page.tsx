import {getPostById} from "@/app/actions/post.action";
import {getAuthorId} from "@/app/actions/author.action";
import DetailPostCardButtons from "@/components/DetailPostCardButtons";
import BlogCard from "@/components/BlogCard";

export default async function GetPostByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In detail-blog", await params)
    const {id} = await params;

    const post = await getPostById(id);
    const author = await getAuthorId(post.authorId as string);

    return (
        <BlogCard authorName={author.name} id={post.id} title={post.title} description={post.content} image={""}>
            <DetailPostCardButtons id={id} isAddButton={true} isEditButton={true} path="posts"/>
        </BlogCard>

    );
}