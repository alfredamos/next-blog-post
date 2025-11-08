import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {Post} from ".prisma/client";
import {postModel} from "@/models/post.model";

export async function GET(){
    //----> Fetch all posts.
    const response = await postModel.getAllPosts();

    //----> Send back response.
    return NextResponse.json(response,{status: StatusCodes.OK});
}

export async function POST(request:NextRequest){
   //----> Get the post payload from request object.
   const post = await request.json() as Post;

   //----> Insert the new post into db.
    const newPost = await postModel.createPost(post);

    //----> Send back response.
    return NextResponse.json(newPost);

}