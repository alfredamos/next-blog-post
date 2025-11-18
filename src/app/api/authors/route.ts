import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {authorModel} from "@/models/author.model";
import {CustomError} from "@/utils/customError.util";

export async function GET({searchParams}:{searchParams: Promise<{query?: string}>}){
    //----> Get the query param.
    const {query} = await searchParams;

    //----> Fetch all authors.
    const response = await authorModel.getAllAuthors(query);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}