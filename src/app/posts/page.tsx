import {getAllPosts} from "@/app/actions/post.action";

export default async function GetAllPosts() {
   const posts = await getAllPosts();
   console.log(posts);
    return(
        <h1 className="px-4 mt-10">All posts</h1>
    )
}