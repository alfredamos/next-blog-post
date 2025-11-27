"use server"

import {Post} from ".prisma/client";
import {postModel} from "@/models/post.model";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {postSchema} from "@/validations/post.validation";

export async function createPost(formData: FormData) {
    //----> Get the post payload from formData.
    const postPayload = Object.fromEntries(formData.entries()) as Post;

    const {title, content, imageUrl} = postPayload;
    const req = {title, content, imageUrl} as Post;

    try {
        //----> Check validation error.
        validateWithZodSchema(postSchema, req)

        //----> Insert new post into db.
        const response = await postModel.createPost(req);

        return {
            post: response,
            error: null
        }
    }catch(error) {
        return {
            post: null,
            error
        }
    }

}

export async function deletePostById(id:string){
    //----> Delete the post with the given id.
    try {
        const response = await postModel.deletePostById(id);

        return {
            post: response,
            error: null
        }
    }catch(error) {
        return {
            post: null,
            error
        }
    }
}

export async function deletePostsByAuthorId(authorId:string){
    try {
        //----> Delete all the posts with the given authorId.
        const response = await postModel.deletePostByAuthorId(authorId);

        return {
            message: response,
            error: null
        }
    }catch(error) {
        return {
            message: null,
            error
        }
    }

}

export async function editPostById(formData:FormData){
    //----> Get the edited-post payload.
    const {id, title, content, imageUrl} = Object.fromEntries(formData.entries()) as Post;

    const req = {id, title, content, imageUrl} as Post;

    console.log("In edit post, req : ", req);

    try {
        //----> Check validation error.
        validateWithZodSchema(postSchema, req)

        //----> Edit the post with the given id.
        const response = await postModel.editPostById(id, req);

        return {
            message: response,
            error: null
        }
    }catch(error) {
        return {
            message: null,
            error
        }
    }
}

export async function getPostById(id:string){
    try {
        //----> Fetch the post with the given id.
        const response = await postModel.getPostById(id);

        return {
            post: response,
            error: null
        }
    }catch(error) {
        return {
            post: null,
            error
        }
    }

}

export async function getAllPosts(){
    try {
        //----> Fetch all posts.
        const response = await postModel.getAllPosts();

        return {
            posts: response,
            error: null
        }
    }catch(error) {
        return {
            posts: null,
            error
        }
    }
}

export async function getPostsByAuthorId(authorId:string){
    try {
        //----> Fetch all the posts with the given authorId.
        const response = await postModel.getPostsByAuthorId(authorId);

        return {
            posts: response,
            error: null
        }
    }catch(error) {
        return {
            posts: null,
            error
        }
    }
}

