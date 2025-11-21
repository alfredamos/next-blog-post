"use server"

import {Post} from ".prisma/client";
import {postModel} from "@/models/post.model";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {postSchema} from "@/validations/post.validation";
import {CustomError} from "@/utils/customError.util";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function createPost(formData: FormData) {
    //----> Get the post payload from formData.
    const postPayload = Object.fromEntries(formData.entries()) as Post;

    const {title, content, imageUrl} = postPayload;
    const req = {title, content, imageUrl} as Post;

    //----> Check validation error.
    const result = validateWithZodSchema(postSchema, req)
    if (result instanceof CustomError) {
        throw new CustomError(result.name, result.message, result.status);
    }
    //----> Insert new post into db.
    const response = await postModel.createPost(req);

    if (response instanceof CustomError) {
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Send back response.
    revalidatePath("/");

}

export async function deletePostById(id:string){
    //----> Delete the post with the given id.
    const response = await postModel.deletePostById(id);

    if (response instanceof CustomError) {
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Send back response.
    revalidatePath("/");
    redirect("/posts")
}

export async function deletePostsByAuthorId(authorId:string){
    //----> Delete all the posts with the given authorId.
    const response = await postModel.deletePostByAuthorId(authorId);

    if (response instanceof CustomError) {
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Send back response.
    return response;

}

export async function editPostById(formData:FormData){
    //----> Get the edited-post payload.
    const {id, title, content, imageUrl} = Object.fromEntries(formData.entries()) as Post;

    const req = {id, title, content, imageUrl} as Post;

    console.log("In edit post, req : ", req);

    //----> Check validation error.
    const result = validateWithZodSchema(postSchema, req)
    if (result instanceof CustomError) {
        throw new CustomError(result.name, result.message, result.status);
    }
    //----> Edit the post with the given id.
    const response = await postModel.editPostById(id, req);

    if (response instanceof CustomError) {
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Send back response.
    revalidatePath("/")

}

export async function getPostById(id:string){
    //----> Fetch the post with the given id.
    const response = await postModel.getPostById(id);

    if (response instanceof CustomError) {
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Send back response.
    return response;

}

export async function getAllPosts(){
    //----> Fetch all posts.
    const response = await postModel.getAllPosts();

    //----> Send back response.
    return response;
}

export async function getPostsByAuthorId(authorId:string){
    //----> Fetch all the posts with the given authorId.
    const response = await postModel.getPostsByAuthorId(authorId);

    //----> Check for error.
    if (response instanceof CustomError) {
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Send back response.
    return response;
}

