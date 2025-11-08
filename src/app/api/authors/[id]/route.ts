import {authorModel} from "@/src/models/author.model";
import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {Author} from "@prisma/client";

export async function DELETE(_req:Request, {params}:{params: Promise<{id: string}>}){
    //----> Get id from params.
    const {id} = await params;

    //----> Delete the author with the given id.
    const response = await authorModel.deleteAuthorById(id);

    //----> Send back response.
    return NextResponse.json(response,{status: StatusCodes.OK});
}

export async function GET(_req:Request, {params}:{params: Promise<{id: string}>}){
    //----> Get id from params.
    const {id} = await params;

    //----> Fetch the author with the given id.
    const response = await authorModel.getAuthorById(id);

    //----> Send back response.
    return NextResponse.json(response,{status: StatusCodes.OK});
}

export async function PATCH(req:Request, {params}:{params: Promise<{id: string}>}){
    //----> Get id from params.
    const {id} = await params;

    //----> Get the author payload to edit from req object.
    const authorToEdit = await req.json() as Author;

    //----> Edit the author with the given id.
    const response = await authorModel.editAuthorById(id, authorToEdit);

    //----> Send back response.
    return NextResponse.json(response,{status: StatusCodes.OK});
}