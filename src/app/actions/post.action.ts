"use server"

import {Post} from ".prisma/client";
import {postModel} from "@/models/post.model";

export async function createPost(req: Post){
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

export async function editPostById(id:string, postToEdit:Post){
    //----> Edit the post with the given id.
    return await postModel.editPostById(id, postToEdit);
}

export async function getPostById(id:string){
    //----> Fetch the post with the given id.
    return await postModel.getPostById(id);
}

export async function getAllPosts(){
    //----> Fetch all posts.
    return postModel.getAllPosts();
}

export async function getPostsByAuthorId(authorId:string){
    //----> Fetch all the posts with the given authorId.
    return await postModel.getPostsByAuthorId(authorId);
}

