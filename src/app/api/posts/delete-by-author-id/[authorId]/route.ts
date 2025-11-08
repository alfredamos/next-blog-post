import {NextResponse} from "next/server";
import {postModel} from "@/models/post.model";

export async function DELETE(_request: Request, {params}: {params: Promise<{authorId: string}>}){
    //----> Get the authorId from params.
    const {authorId} = await params;

    //----> Delete all the posts associated with this authorId.
    const response = await postModel.deletePostByAuthorId(authorId);

    //----> Send back response.
    return NextResponse.json(response);
}