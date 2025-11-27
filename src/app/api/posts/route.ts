import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {Post} from ".prisma/client";
import {postModel} from "@/models/post.model";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {postSchema} from "@/validations/post.validation";
import {CustomError} from "@/utils/customError.util";

export async function GET(){
    try {
        //----> Fetch all posts.
        const response = await postModel.getAllPosts();

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch(err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}

export async function POST(request:NextRequest){
   //----> Get the post payload from request object.
   const post = await request.json() as Post;

   try {
       //----> Check validation error.
       validateWithZodSchema(postSchema, post)

       //----> Insert the new post into db.
       const newPost = await postModel.createPost(post);

       //----> Send back response.
       return NextResponse.json(newPost, {status: StatusCodes.CREATED});
   }catch(err){
       const error = err as CustomError;
       return NextResponse.json(error, {status: error?.status });
   }

}