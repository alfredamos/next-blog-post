import {Post} from ".prisma/client";
import {StatusCodes} from "http-status-codes";
import {getLoggedInUserInfo} from "@/lib/getLoggedInUser";
import {resourceIsNullOrUndefined} from "@/utils/checkForNullResource.util";
import prisma from "@/db/prisma.db";
import {ownerCheckOrAdmin} from "@/utils/ownerCheckOrAdmin.util";
import {CustomError} from "@/utils/customError.util";
import {ResponseMessageUtil} from "@/utils/responseMessage.util";

class PostModel{
    async createPost(postToCreate: Post){
        //----> Get the current user info.
        const userAuth = await getLoggedInUserInfo();

        //----> Get the author associated with user.
        const author = await this.getOneAuthor(userAuth.id)
        if (!author) return resourceIsNullOrUndefined("author");

        //----> Insert the new post in the db.
        return  prisma.post.create({data: {...postToCreate, authorId: author.id}});
    }

    async deletePostById(id:string){
        //----> Fetch the post with given id.
        const post = await this.getOnePost(id);
        if (!post) return resourceIsNullOrUndefined("post");

        //----> Check for ownership or admin.
        const author = await prisma.author.findUnique({where:{id: post.authorId as string}});
        if (!author) return resourceIsNullOrUndefined("author");
        if (!await ownerCheckOrAdmin(author.userId)){
            return new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
        }

        //----> Delete the post with the given id.
        await prisma.post.delete({where:{id}});

        //----> Send back response.
        return new ResponseMessageUtil("Post has been deleted successfully!", "success", StatusCodes.OK)
    }

    async deletePostByAuthorId(authorId:string){
        //----> Check for ownership or admin.
        const author = await prisma.author.findUnique({where:{id: authorId}});
        if (!author) return resourceIsNullOrUndefined("author")
        if (!await ownerCheckOrAdmin(author.userId)){
            return new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
        }

        //----> Fetch all posts associated with the given authorId.
        const posts = await prisma.post.findMany({where:{authorId}});

        //----> collect all posts ids.
        const postIds = posts.map(post => post.id);

        //----> Delete all the posts associated with the given authorId.
        const deletedPosts = await prisma.post.deleteMany({where: {
            id : {
                in: postIds,
            }
            }});

        //----> Check for existence of deletedPosts.
        if (!deletedPosts?.count) return new CustomError("Not found", "This is author has no posts to delete!", StatusCodes.NOT_FOUND);


        //----> Send back response.
        return new ResponseMessageUtil("All posts have been deleted successfully!", "success", StatusCodes.OK)
    }

    async editPostById(id:string, postToEdit:Post){
        //----> Fetch the post with given id.
        const post = await this.getOnePost(id);
        if (!post) return resourceIsNullOrUndefined("post");

        //----> Check for ownership or admin.
        const author = await prisma.author.findUnique({where:{id: post.authorId as string}});
        if (!author) return resourceIsNullOrUndefined("author")
        if (!await ownerCheckOrAdmin(author.userId)){
            return new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
        }

        //----> Edit the post with the given id.
        await prisma.post.update({where:{id}, data: {...postToEdit, id: post.id, authorId: post.authorId},});

        //----> Send back response.
        return new ResponseMessageUtil("Post has been edited successfully!", "success", StatusCodes.OK)
    }

    async getPostById(id:string){
        //----> Fetch the post with given id.
        const post = await  this.getOnePost(id);
        if (!post) return resourceIsNullOrUndefined("post");

        //----> Check for ownership or admin.
        const author = await prisma.author.findUnique({where:{id: post.authorId as string}});
        if (!author) return resourceIsNullOrUndefined("author")
        if (!await ownerCheckOrAdmin(author.userId)){
            return new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
        }

        //----> Send back response.
        return post
    }

    async getAllPosts(){
        // //----> Must be an admin.
        // if (!await adminUserUtil()){
        //     return new CustomError("Forbidden", "You don't have permission to view or perform this action on this page!", StatusCodes.FORBIDDEN)
        // }

        //----> Fetch all posts.
        return prisma.post.findMany({});
    }

    async getPostsByAuthorId(authorId:string){
        //----> Check for ownership or admin.
        const author = await prisma.author.findUnique({where:{id: authorId}});
        if (!author) return resourceIsNullOrUndefined("author");
        await ownerCheckOrAdmin(author.userId);

        //----> Fetch all posts.
        return prisma.post.findMany({where: {authorId}});
    }

    private async getOneAuthor(userId: string){
        //----> Fetch the author with the given id from db.
        return prisma.author.findUnique({where: {userId}});
    }

    private async getOnePost(id: string){
        //----> Fetch the post with the given id from db.
        return prisma.post.findUnique({where: {id}});


    }
}

export const postModel = new PostModel();