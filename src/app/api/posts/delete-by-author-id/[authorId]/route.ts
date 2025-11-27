import {NextResponse} from "next/server";
import {postModel} from "@/models/post.model";
import {CustomError} from "@/utils/customError.util";
import {StatusCodes} from "http-status-codes";

export async function DELETE(_request: Request, {params}: {params: Promise<{authorId: string}>}){
    //----> Get the authorId from params.
    const {authorId} = await params;

    try {
        //----> Delete all the posts associated with this authorId.
        const response = await postModel.deletePostByAuthorId(authorId);

        //----> Send back response.
        return NextResponse.json(response);
    }catch(err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}