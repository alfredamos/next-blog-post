import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {Post} from ".prisma/client";
import {postModel} from "@/models/post.model";

export async function DELETE(_req: Request, {params}: {params: Promise<{id: string}>}) {
    //----> Get the id from params.
    const {id} = await params;

    //----> Delete the post with the given id.
    const response = await postModel.deletePostById(id);

    //----> Send back response
    return NextResponse.json(response,{status: StatusCodes.OK});
}

export async function GET(_req: Request, {params}: {params: Promise<{id: string}>}) {
    //----> Get the id from params.
    const {id} = await params;

    //----> Fetch the post with the given id.
    const response = await postModel.getPostById(id);

    //----> Send back response
    return NextResponse.json(response,{status: StatusCodes.OK});
}

export async function PATCH(req: Request, {params}: {params: Promise<{id: string}>}) {
    //----> Get the id from params.
    const {id} = await params;

    //----> Get the post to edit payload from request object.
    const postToEdit = await req.json() as Post;

    //----> Edit the post with the given id.
    const response = await postModel.editPostById(id, postToEdit);

    //----> Send back response
    return NextResponse.json(response,{status: StatusCodes.OK});
}

export async function POST(req: Request,) {
    //----> Get the post payload from request object.
    const postToCreate = await req.json() as Post;

    //----> Create a new post.
    const response = await postModel.createPost(postToCreate);

    //----> Send back response
    return NextResponse.json(response,{status: StatusCodes.CREATED});
}