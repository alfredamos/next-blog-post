import BlogPostForm from "@/app/posts/add/BlogPostForm";
import {editPostById, getPostById} from "@/app/actions/post.action";
import {Post} from "@/validations/post.validation";

export default async function EditPostByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In delete-post", await params)
    const {id} = await params;
    const post = await getPostById(id);

    return (
        <BlogPostForm postAction={editPostById} post={post as Post} />
    );
}