"use server"

import {Post} from ".prisma/client";
import {postModel} from "@/models/post.model";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {postSchema} from "@/validations/post.validation";
import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {CustomError} from "@/utils/customError.util";

export async function createPost(req: Post){
    //----> Check validation error.
    const result = validateWithZodSchema(postSchema, req)
    if (result instanceof NextResponse) {
        return result;
    }
    //----> Insert new post into db.
    return await postModel.createPost(req);
}

export async function deletePostById(id:string){
    //----> Delete the post with the given id.
    return await postModel.deletePostById(id);
}

export async function deletePostsByAuthorId(authorId:string){
    //----> Delete all the posts with the given authorId.
    return await postModel.deletePostByAuthorId(authorId);
}

export async function editPostById(id:string, req:Post){
    //----> Check validation error.
    const result = validateWithZodSchema(postSchema, req)
    if (result instanceof NextResponse) {
        return result;
    }
    //----> Edit the post with the given id.
    return await postModel.editPostById(id, req);
}

export async function getPostById(id:string){
    //----> Fetch the post with the given id.
    return await postModel.getPostById(id);
}

export async function getAllPosts(){
    //----> Fetch all posts.
    const response = await postModel.getAllPosts();

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}

export async function getPostsByAuthorId(authorId:string){
    //----> Fetch all the posts with the given authorId.
    const response = await postModel.getPostsByAuthorId(authorId);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}

