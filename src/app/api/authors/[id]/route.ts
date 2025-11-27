import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {Author} from "@prisma/client";
import {authorModel} from "@/models/author.model";
import {authorSchema} from "@/validations/author.validation";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {CustomError} from "@/utils/customError.util";

export async function DELETE(_req:Request, {params}:{params: Promise<{id: string}>}){
    //----> Get id from params.
    const {id} = await params;

    try {
        //----> Delete the author with the given id.
        const response = await authorModel.deleteAuthorById(id);

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch(err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}

export async function GET(_req:Request, {params}:{params: Promise<{id: string}>}){
    //----> Get id from params.
    const {id} = await params;

    try {
        //----> Fetch the author with the given id.
        const response = await authorModel.getAuthorById(id);

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch(err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}

export async function PATCH(req:Request, {params}:{params: Promise<{id: string}>}){
    //----> Get id from params.
    const {id} = await params;

    //----> Get the author payload to edit from req object.
    const authorToEdit = await req.json() as Author;

    try {
        //----> Check validation error.
        validateWithZodSchema(authorSchema, authorToEdit)

        //----> Edit the author with the given id.
        const response = await authorModel.editAuthorById(id, authorToEdit);

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch(err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}