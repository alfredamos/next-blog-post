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

    //----> Delete the author with the given id.
    const response = await authorModel.deleteAuthorById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response.
    return NextResponse.json(response,{status: StatusCodes.OK});
}

export async function GET(_req:Request, {params}:{params: Promise<{id: string}>}){
    //----> Get id from params.
    const {id} = await params;

    //----> Fetch the author with the given id.
    const response = await authorModel.getAuthorById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response.
    return NextResponse.json(response,{status: StatusCodes.OK});
}

export async function PATCH(req:Request, {params}:{params: Promise<{id: string}>}){
    //----> Get id from params.
    const {id} = await params;

    //----> Get the author payload to edit from req object.
    const authorToEdit = await req.json() as Author;

    //----> Check validation error.
    const result = validateWithZodSchema(authorSchema, authorToEdit)
    if (result instanceof NextResponse) {
        return NextResponse.json(result);
    }

    //----> Edit the author with the given id.
    const response = await authorModel.editAuthorById(id, authorToEdit);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response.
    return NextResponse.json(response,{status: StatusCodes.OK});
}