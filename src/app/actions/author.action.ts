"use server"

import {Author} from "@prisma/client";
import {authorModel} from "@/models/author.model";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {authorSchema} from "@/validations/author.validation";
import {NextResponse} from "next/server";
import {CustomError} from "@/utils/customError.util";
import {redirect} from "next/navigation";
import {StatusCodes} from "http-status-codes";

export async function deleteAuthorId(id: string){
    //----> Delete the author with given id.
    const response = await authorModel.deleteAuthorById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Redirect to all authors
    redirect("/authors")
}

export async function editAuthorId(id: string, req: Author){
    //----> Check validation error.
    const result = validateWithZodSchema(authorSchema, req)

    //----> Check for validation errors
    if (result instanceof CustomError) {
        throw new CustomError(result.name, result.message, result.status);
    }

    //----> Edit the author with the given id.
    const response = await authorModel.editAuthorById(id, req);

    //----> Check for error.
    if (response instanceof CustomError) {
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Redirect to all authors.
    redirect("/authors")
}

export async function getAuthorEmail(email: string){
    //----> Fetch the author with given email.
    const response = await authorModel.getAuthorByEmail(email);

    //----> Check for error.
    if (response instanceof CustomError){
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Send back response.
    return response;
}

export async function getAuthorId(id: string){
    //----> Fetch the author with given id.
    const response = await authorModel.getAuthorById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Send back response.
    return response;

}

export async function getAllAuthors(query?: string){
    //----> Fetch all authors from db.
    const response = await authorModel.getAllAuthors(query);

    //----> Check for error.
    if (response instanceof CustomError) {
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Send back response.
    return response;
}