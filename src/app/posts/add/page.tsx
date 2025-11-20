import BlogPostForm from "@/app/posts/add/BlogPostForm";
import {createPost} from "@/app/actions/post.action";

export default function AddPost(){
    return (
        <BlogPostForm postAction={createPost} post={{title: "", content: "", imageUrl: ""}} />
    );
}