import {getAllPosts} from "@/app/actions/post.action";

export default async function GetAllPosts() {
   const posts = await getAllPosts();
   console.log(posts);
    return(
        <h1>All posts</h1>
    )
}