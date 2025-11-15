import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {Post} from ".prisma/client";
import {postModel} from "@/models/post.model";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {postSchema} from "@/validations/post.validation";
import {CustomError} from "@/utils/customError.util";

export async function DELETE(_req: Request, {params}: {params: Promise<{id: string}>}) {
    //----> Get the id from params.
    const {id} = await params;

    //----> Delete the post with the given id.
    const response = await postModel.deletePostById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response
    return NextResponse.json(response,{status: StatusCodes.OK});
}

export async function GET(_req: Request, {params}: {params: Promise<{id: string}>}) {
    //----> Get the id from params.
    const {id} = await params;

    //----> Fetch the post with the given id.
    const response = await postModel.getPostById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response
    return NextResponse.json(response,{status: StatusCodes.OK});
}

export async function PATCH(req: Request, {params}: {params: Promise<{id: string}>}) {
    //----> Get the id from params.
    const {id} = await params;

    //----> Get the post to edit payload from request object.
    const postToEdit = await req.json() as Post;

    //----> Check validation error.
    const result = validateWithZodSchema(postSchema, postToEdit)
    if (result instanceof NextResponse) {
        return NextResponse.json(result);
    }

    //----> Edit the post with the given id.
    const response = await postModel.editPostById(id, postToEdit);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response
    return NextResponse.json(response,{status: StatusCodes.OK});
}

