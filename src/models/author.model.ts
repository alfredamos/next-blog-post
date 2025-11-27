import {StatusCodes} from "http-status-codes";
import {Author} from "@prisma/client";
import {ownerCheckOrAdmin} from "@/utils/ownerCheckOrAdmin.util";
import {CustomError} from "@/utils/customError.util";
import prisma from "@/db/prisma.db";
import {ResponseMessageUtil} from "@/utils/responseMessage.util";
import {adminUserUtil} from "@/utils/adminUser.util";

class AuthorModel{
    async deleteAuthorById(id: string) {
       //----> Fetch the author with the given id.
       const author = await this.getOneAuthor(id);

        //----> Check for ownership or admin.
        if (!await ownerCheckOrAdmin(author.userId)){
            throw new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
        }

       //----> Delete the user and the associated author.
        await prisma.user.delete({ where: { id : author.userId } });

       //----> Send back response.
       return new ResponseMessageUtil("User and the associated author have been deleted successfully from db!", "success", StatusCodes.OK);
    }

    async editAuthorById(id: string, authorToEdit: Author) {
       //----> Fetch the author with the given id.
       const author = await this.getOneAuthor(id);

       //----> Check for ownership or admin.
        if (!await ownerCheckOrAdmin(author.userId)){
            throw new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
        }

       //----> Calculate age.
        const calcAge = new Date().getFullYear() - new Date(authorToEdit.dateOfBirth).getFullYear();
        const age = calcAge > 0 ? calcAge : author.age;

       //----> Edit the author and the associated user.
       const editedAuthor = await prisma.author.update({ where: { id  }, data: {...authorToEdit, id: author.id, email: author.email, userId: author.userId, age } });

       //----> Edit associated user.
       const user = await this.getOneUser(author.userId);
       user.name = editedAuthor.name;
       user.image = editedAuthor.image;
       await prisma.user.update({where: {id: user.id}, data: {...user}});

       //----> Send back response.
       return new ResponseMessageUtil("User and the associated author have been edited successfully!", "success", StatusCodes.OK);
    }

    async getAuthorById(id: string) {
        //----> Fetch the author with the given id.
        return this.getOneAuthor(id);

    }

    async getAuthorByEmail(email: string) {
        //----> Fetch the author with the given email.
        const author = await prisma.author.findUnique({where: { email }});
        if (!author) {
            throw new CustomError("Not found", "Author is not foud in db!", StatusCodes.NOT_FOUND);
        }

        //----> Check for ownership or admin.
        if (!await ownerCheckOrAdmin(author.userId)){
            throw new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
        }

        //----> Send back response.
        return author;
    }

    async getAllAuthors(query?: string) {
        //----> Must be an admin.
        if (!await adminUserUtil()){
            throw new CustomError("Forbidden", "You don't have permission to view or perform this action!", StatusCodes.FORBIDDEN)
        }

        //----> Get authors marching the giving query.
        if(query){
            return prisma.author.findMany({where: {
            OR:[
                {address : {contains : query}},
                {email : {contains : query}},
                {name : {contains : query}},
                {phone : {contains : query}},
            ],}
            });
        }

        //----> Fetch all authors.
        return prisma.author.findMany({});
    }


    private async getOneAuthor(id: string)  {
        //----> Fetch the author with the given id.
        const author = await prisma.author.findUnique({where: {id: id}});

        //----> Check for error.
        if (!author) {
            throw new CustomError("Not found", "Author is not foud in db!", StatusCodes.NOT_FOUND);
        }

        return author;

    }

    private async getOneUser(id: string)  {
        //----> Fetch the user with the given id.
        const user = await prisma.user.findUnique({where: {id: id}});

        //----> Check for error.
        if (!user) {
            throw new CustomError("Not found", "Author is not foud in db!", StatusCodes.NOT_FOUND);
        }

        return user;
    }
}

export const authorModel = new AuthorModel();