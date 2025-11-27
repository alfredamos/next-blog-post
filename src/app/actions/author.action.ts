"use server"

import {Author} from "@prisma/client";
import {authorModel} from "@/models/author.model";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {authorSchema} from "@/validations/author.validation";

export async function deleteAuthorId(id: string){
    //----> Delete the author with given id.
    try{
        const response = await authorModel.deleteAuthorById(id);
        return {
            message: response,
            error : null
        }
    }catch(error){
        return {
            message: null,
            error
        }
    }



}


export async function editAuthorId(formData: FormData){
    //----> Get the author payload to edit from formData.
    const payload = Object.fromEntries(formData.entries()) as unknown as Author;
    const req ={
        id: payload.id,
        name: payload.name,
        address: payload.address,
        email: payload.email,
        phone: payload.phone,
        gender: payload.gender,
        image: payload.image,
        dateOfBirth: payload.dateOfBirth
    } as Author;

    try {
        validateWithZodSchema(authorSchema, req);


        const dateOfBirth = req.dateOfBirth
        req.dateOfBirth = new Date(dateOfBirth);
        const response = await authorModel.editAuthorById(payload.id, req);

        return {
            message: response,
            error: null
        }
    }catch (error) {
        return {
            message: null,
            error
        }
    }

}


export async function getAuthorEmail(email: string){
    //----> Fetch the author with given email.

    try {
        const response = await authorModel.getAuthorByEmail(email);

        return {
            author: response,
            error: null
        }
    }catch(error){
        return {
            author: null,
            error
        }
    }
}

export async function getAuthorId(id: string){
    //----> Fetch the author with given id.
    try {
        const response = await authorModel.getAuthorById(id);
        return {
            author: response,
            error: null
        }
    }catch(error){
        return {
            author: null,
            error
        }
    }

}

export async function getAllAuthors(query?: string){
    //----> Fetch all authors from db.
    try {
        const response = await authorModel.getAllAuthors(query);

        return {
            authors: response,
            error: null
        }
    }catch(error){
        return {
            authors: null,
            error
        }
    }

}


