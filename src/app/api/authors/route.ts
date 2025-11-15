import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {authorModel} from "@/models/author.model";
import {CustomError} from "@/utils/customError.util";

export async function GET(){
    //----> Fetch all authors.
    const response = await authorModel.getAllAuthors();

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}