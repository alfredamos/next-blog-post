import {Post} from ".prisma/client";
import {StatusCodes} from "http-status-codes";
import {getLoggedInUserInfo} from "@/lib/getLoggedInUser";
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

        //----> Insert the new post in the db.
        return  prisma.post.create({data: {...postToCreate, authorId: author.id}});
    }

    async deletePostById(id:string){
        //----> Fetch the post with given id.
        const post = await this.getOnePost(id);

        //----> Check for ownership or admin privilege.
        const author = await this.getOneAuthor(id);
        console.log("In delete-post-by-id, author : ", author);

        //----> Check for ownership and admin privilege.
        if (!await ownerCheckOrAdmin(author.userId)){
            throw new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
        }

        //----> Delete the post with the given id.
        await prisma.post.delete({where:{id}});

        //----> Send back response.
        return post
    }

    async deletePostByAuthorId(authorId:string){
        //----> Check for ownership or admin.
        const author = await this.getOneAuthor(authorId);

        //----> Check for ownership and admin privilege.
        if (!await ownerCheckOrAdmin(author.userId)){
            throw new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
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

        //----> Fetch the author associated with this post
        const author = await this.getOneAuthor(post.authorId as string);

        //----> Check for ownership or admin.
        if (!await ownerCheckOrAdmin(author.userId)){
            throw new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
        }

        //----> Edit the post with the given id.
        await prisma.post.update({where:{id}, data: {...postToEdit, id: post.id, authorId: post.authorId},});

        //----> Send back response.
        return new ResponseMessageUtil("Post has been edited successfully!", "success", StatusCodes.OK)
    }

    async getPostById(id:string){
        //----> Fetch the post with given id.
        const post = await  this.getOnePost(id);

        //----> Send back response.
        return post
    }

    async getAllPosts(){
        //----> Fetch all posts.
        return prisma.post.findMany({});
    }

    async getPostsByAuthorId(authorId:string){
        //----> Check for ownership or admin.
        const author = await this.getOneAuthor(authorId);

        //----> Check for ownership or admin privilege.
        await ownerCheckOrAdmin(author.userId);

        //----> Fetch all posts.
        return prisma.post.findMany({where: {authorId}});
    }

    private getOneAuthor = async (userId: string) =>{
        //----> Fetch the author with the given id from db.
        const author = await prisma.author.findUnique({where: {userId}});

        //----> Check for error.
        if (!author) {
            throw new CustomError("Not found", "Author is not foud in db!", StatusCodes.NOT_FOUND);
        }

        return author;
    }

    private getOnePost = async (id: string)=>{
        //----> Fetch the post with the given id from db.
        const post = await prisma.post.findUnique({where: {id}});

        //----> Check for error.
        if (!post) {
            throw new CustomError("Not found", "Post is not foud in db!", StatusCodes.NOT_FOUND);
        }

        return post;


    }
}

export const postModel = new PostModel();