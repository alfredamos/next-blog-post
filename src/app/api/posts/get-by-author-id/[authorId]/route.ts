import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {postModel} from "@/models/post.model";

export async function GET(_request:Request, {params}: {params: Promise<{authorId: string}>}){
    //----> Get the authorId from params
    const {authorId} = await params;

    //----> Fetch posts by authorId.
    const response = await postModel.getPostsByAuthorId(authorId);

    //----> Send back response.
    return NextResponse.json(response,{status: StatusCodes.OK});
}
