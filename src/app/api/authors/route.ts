import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {authorModel} from "@/models/author.model";

export async function GET(){
    //----> Fetch all authors.
    const authors = await authorModel.getAllAuthors();

    //----> Send back response.
    return NextResponse.json(authors, {status: StatusCodes.OK});
}