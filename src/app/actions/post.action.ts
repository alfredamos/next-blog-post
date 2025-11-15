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
    if (result instanceof CustomError) {
        return NextResponse.json(result, {status: StatusCodes.BAD_REQUEST});
    }
    //----> Insert new post into db.
    const response = await postModel.createPost(req);

    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.INTERNAL_SERVER_ERROR})
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}

export async function deletePostById(id:string){
    //----> Delete the post with the given id.
    const response = await postModel.deletePostById(id);

    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.INTERNAL_SERVER_ERROR})
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}

export async function deletePostsByAuthorId(authorId:string){
    //----> Delete all the posts with the given authorId.
    const response = await postModel.deletePostByAuthorId(authorId);

    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.INTERNAL_SERVER_ERROR})
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}

export async function editPostById(id:string, req:Post){
    //----> Check validation error.
    const result = validateWithZodSchema(postSchema, req)
    if (result instanceof CustomError) {
        return NextResponse.json(result, {status: StatusCodes.BAD_REQUEST});
    }
    //----> Edit the post with the given id.
    const response = await postModel.editPostById(id, req);

    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.INTERNAL_SERVER_ERROR})
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}

export async function getPostById(id:string){
    //----> Fetch the post with the given id.
    const response = await postModel.getPostById(id);

    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.INTERNAL_SERVER_ERROR})
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

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
        return NextResponse.json(response, {status: StatusCodes.UNAUTHORIZED});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}

