import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {postModel} from "@/models/post.model";
import {CustomError} from "@/utils/customError.util";

export async function GET(_request:Request, {params}: {params: Promise<{authorId: string}>}){
    //----> Get the authorId from params
    const {authorId} = await params;

    try {
        //----> Fetch posts by authorId.
        const response = await postModel.getPostsByAuthorId(authorId);

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch(err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}
