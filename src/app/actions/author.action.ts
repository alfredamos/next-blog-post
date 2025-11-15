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
        return NextResponse.json(response, {status: StatusCodes.UNAUTHORIZED});
    }

    //----> Redirect to all authors
    redirect("/authors")
}

export async function editAuthorId(id: string, req: Author){
    //----> Check validation error.
    const result = validateWithZodSchema(authorSchema, req)

    //----> Check for validation errors
    if (result instanceof CustomError) {
        return NextResponse.json(result, {status: StatusCodes.BAD_REQUEST});
    }

    //----> Edit the author with the given id.
    const response = await authorModel.editAuthorById(id, req);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.INTERNAL_SERVER_ERROR});
    }

    //----> Redirect to all authors.
    redirect("/authors")
}

export async function getAuthorEmail(email: string){
    //----> Fetch the author with given email.
    const response = await authorModel.getAuthorByEmail(email);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.INTERNAL_SERVER_ERROR});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}

export async function getAuthorId(id: string){
    //----> Fetch the author with given id.
    const response = await authorModel.getAuthorById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.INTERNAL_SERVER_ERROR});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}

export async function getAllAuthors(){
    //----> Fetch all authors from db.
    const response = await authorModel.getAllAuthors();

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.INTERNAL_SERVER_ERROR});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}