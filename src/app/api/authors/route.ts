import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {authorModel} from "@/models/author.model";
import {CustomError} from "@/utils/customError.util";

export async function GET(request: NextRequest){
    //----> Get the search query.
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    try {
        //----> Fetch all authors.
        const response = await authorModel.getAllAuthors(query as string);

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch(err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}