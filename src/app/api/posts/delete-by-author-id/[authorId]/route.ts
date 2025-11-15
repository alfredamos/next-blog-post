import {NextResponse} from "next/server";
import {postModel} from "@/models/post.model";
import {CustomError} from "@/utils/customError.util";

export async function DELETE(_request: Request, {params}: {params: Promise<{authorId: string}>}){
    //----> Get the authorId from params.
    const {authorId} = await params;

    //----> Delete all the posts associated with this authorId.
    const response = await postModel.deletePostByAuthorId(authorId);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response.
    return NextResponse.json(response);
}