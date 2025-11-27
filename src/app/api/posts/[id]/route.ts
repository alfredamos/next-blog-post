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

    try {
        //----> Delete the post with the given id.
        const response = await postModel.deletePostById(id);

        //----> Send back response
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch(err) {
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}

export async function GET(_req: Request, {params}: {params: Promise<{id: string}>}) {
    //----> Get the id from params.
    const {id} = await params;

    try {
        //----> Fetch the post with the given id.
        const response = await postModel.getPostById(id);

        //----> Send back response
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch(err) {
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}

export async function PATCH(req: Request, {params}: {params: Promise<{id: string}>}) {
    //----> Get the id from params.
    const {id} = await params;

    //----> Get the post to edit payload from request object.
    const postToEdit = await req.json() as Post;

    try {
        //----> Check validation error.
        validateWithZodSchema(postSchema, postToEdit)

        //----> Edit the post with the given id.
        const response = await postModel.editPostById(id, postToEdit);

        //----> Send back response
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch(err) {
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}

