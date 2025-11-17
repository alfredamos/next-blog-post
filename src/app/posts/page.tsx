import {getAllPosts} from "@/app/actions/post.action";

export default async function GetAllPosts() {
   const allPosts = await getAllPosts();
    return (
        <>{allPosts.map(post => <h2 key={post.id} className="pl-50">{post.title}</h2>)
        }</>
    );
}